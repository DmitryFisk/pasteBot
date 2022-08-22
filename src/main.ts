import { Telegraf } from "telegraf";
import { generatePastes } from "./utils";
import { token } from "./config";

const bot = new Telegraf(token);
bot.pastes = [];

bot.on("inline_query", async (ctx) => {
    const filter: object = bot.pastes.filter(p => p.type.toUpperCase().includes(ctx.inlineQuery.query.toUpperCase()));
    
    ctx.answerInlineQuery(filter.map(p => {
        return {
            id: p.id,
            title: `Паста про ${p.type.toLowerCase()}`,
            description: p.description,
            type: "article",
            input_message_content: {
                message_text: p.content.substr(0, 4090)
            }
        }
    }));
});

bot.launch().then(async () => {
    console.log("Bot started");

    await generatePastes(bot);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
