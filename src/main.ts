import { Context, Telegraf } from "telegraf";
import { token } from "./config.json";
import { Paste } from "./paste";
import { readdir } from "fs/promises";
import { resolve } from "path";
import { InlineQueryResult, Update } from "telegraf/typings/core/types/typegram";

class PasteBot extends Telegraf {
    pastes: Paste[] = [];

    constructor() {
        super(token);
    }

    async launch() {
        await super.launch();

        const files = await readdir("./raw/");
        for (const file of files) {
            const path = resolve("./raw", file);
            const paste = await Paste.fromFile(path);

            this.pastes.push(paste);
        }

        this.on("inline_query", this.onInlineQuery.bind(this));
    }

    async onInlineQuery(ctx: Context<Update>) {
        const query = ctx.inlineQuery!!.query;
        const matching = this.pastes.filter((paste) => paste.matches(query));

        const inlineResults: InlineQueryResult[] = matching.map((paste) => {
            return {
                id: this.pastes.indexOf(paste).toString(),
                title: paste.title,
                description: paste.text,
                type: "article",
                video_url: null,
                input_message_content: {
                    message_text: paste.text.slice(0, 4090)
                }
            };
        });

        await ctx.answerInlineQuery(inlineResults);
    }
}

const bot = new PasteBot();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
