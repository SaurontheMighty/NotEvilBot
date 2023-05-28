import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../interfaces/Command";

export const helloWorld: Command = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("A simple hello world command"),
    run: async (interaction: ChatInputCommandInteraction) => {
        await interaction.reply("Hello, world!");
    },
};
