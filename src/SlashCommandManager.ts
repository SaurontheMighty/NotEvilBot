import { Client, REST, Routes } from "discord.js";
import * as fs from "fs";
import { Command } from "./interfaces/Command";

let rest: REST | undefined = undefined;
const commands:{[id: string]: Command} = {};

export async function init() {
    console.log(`[Command] Beginning command load...`);
    const commandFiles = fs.readdirSync(__dirname+'/commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const name = file.split(".")[0];
        const cmd_file = await import(__dirname+`/commands/${name}`);
        const command = cmd_file[name] as Command;
        
        commands[command.data.name] = command;
        console.log(`[Command] Loaded Command "${name}"`);
    }
    console.log(`[Command] Finished command load.`);
}

export async function update(client: Client, commands: Command[]) {
    if(rest == undefined)
        rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN!);
    
    let clientId = client.user?.id;
    if(clientId == null)
        return console.error('[Discord] Failed to reload application (/) commands, is the bot ready?');
    
    try {
        console.log('[Discord] Started reload of application (/) commands.');
        let commandData = commands.map(cmd=> cmd.data.toJSON());

        let guilds = client.guilds.cache.map(guild=> guild.id);
        for(let i in guilds) {
            try {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guilds[i]),
                    { body: commandData },
                );
            } catch(e){
                console.error("[Discord] Error reloading application (/) commands for a guild:", e);
            }
        }

        console.log('[Discord] Finished reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

export function getCommandByName(name: string){
    return commands[name];
}

export function getCommands(){
    return Object.values(commands);
}