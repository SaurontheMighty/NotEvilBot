import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
import * as dotenv from "dotenv";
import * as SCMgr from "./SlashCommandManager";
// import config from "./data/config.json"

(async () => {
    dotenv.config(); 
    
    if (!process.env.BOT_TOKEN) {
        console.warn("[System] Missing Discord bot token.");
        return false;
    }

    console.log("[System] Beginning load...");
    await SCMgr.init();

    const BOT = new Client({ intents: IntentOptions });

    BOT.on("ready", async () => await onReady(BOT));

    BOT.on("interactionCreate", async (interaction) => 
        await onInteraction(interaction)
    );

    await BOT.login(process.env.BOT_TOKEN);
})();