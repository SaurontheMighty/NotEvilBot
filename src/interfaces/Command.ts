import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, MessageComponentInteraction } from "discord.js";

export interface Command {
    data:
        | SlashCommandBuilder
        | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    run: (
        interaction: ChatInputCommandInteraction
    ) => Promise<void>;
    handleMisc?: (
        interaction: MessageComponentInteraction,
        subid: string
    ) => Promise<void>;
}