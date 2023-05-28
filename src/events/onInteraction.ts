import { ChatInputCommandInteraction, Interaction } from "discord.js";
import { getCommandByName } from "../SlashCommandManager";
import { MessageComponentInteraction } from "discord.js";

export const onInteraction = async (interaction: Interaction) => {
    if (interaction instanceof ChatInputCommandInteraction) {
        let command = getCommandByName(interaction.commandName);
        if(command == null) return;
        try {
            await command.run(interaction);
        } catch(e) {
            console.error(
                "[Discord] Error occured whilst executing a command interaction:",
                e
            );
        }
    } else if(interaction instanceof MessageComponentInteraction) {
        if(interaction.customId.split(":").length <= 1) return;

        let split = interaction.customId.split(":", 1);
        let command = getCommandByName(split[0]);
        if(command == null || !command.handleMisc) return;

        try {
            command.handleMisc(interaction, split[1]);
        } catch(e){ 
            console.error(
                "[Discord] Error occured whilst executing a command subinteraction:",
                e
            ); 
        }
    }
};