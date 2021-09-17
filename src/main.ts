import { Telegraf } from "telegraf";
import { GlobSync } from "glob";
import { Config } from "./Interfaces/Config";
import { Paste } from "./Interfaces/Paste";
import * as File from "./config";

const bot: Telegraf = new Telegraf(((File as Config).token));
bot.pastes = [];

loadPastes();

bot.on("inline_query", async (ctx) => {
    const filter: object = bot.pastes.filter(p => p.name.toUpperCase().includes(ctx.inlineQuery.query.toUpperCase()));
    
    ctx.answerInlineQuery(filter.map(p => {
        return {
            id: p.id,
            title: `Паста про ${p.name}`,
            description: p.description,
            type: "article",
            input_message_content: {
                message_text: p.content.substr(0, 4090)
            }
        }
    }));
});

bot.launch().then(() => {
    console.log("Bot started");
});

async function loadPastes(array: object): Promise<void> {
    const pastes: string[] = await GlobSync(`${__dirname}/./pastes/*.ts`);
    pastes.found.map(async (value: string) => {
        const file: Paste = await import(value);
        bot.pastes.push(file);
    });
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
