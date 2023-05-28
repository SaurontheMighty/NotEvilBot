import { REST } from "@discordjs/rest";
import { Client } from "discord.js";
import * as SCMgr from "../SlashCommandManager";

export const onReady = async (BOT: Client) => {
    const rest = new REST({ version: "9" }).setToken(
        process.env.BOT_TOKEN as string
    );

    console.log("[Discord] Gateway Ready");

    // This is a DEBUG ONLY line. DO NOT run this in production, 
    // you may cause ratelimits and crashes.
    // TODO Implement /reloadcommands command
    SCMgr.update(BOT, SCMgr.getCommands());

    console.log("[System] Load Complete.");
};