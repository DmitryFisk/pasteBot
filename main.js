const { Telegraf } = require("telegraf");
const bot = new Telegraf(require("./config.json").token);
const fs = require("fs");

const files = fs.readdirSync("./txt/");
/** @type {string[]} */
const pasta = [];

for (const file of files) {
    pasta.push(fs.readFileSync("./txt/" + file, "utf-8"));
}

bot.on("inline_query", async (ctx) => {
    const sp = pasta.filter(p => p.toUpperCase().includes(ctx.inlineQuery.query.toUpperCase()));


    ctx.answerInlineQuery(sp.map(pst => {
        const fn = files[pasta.indexOf(pst)];
        return {
            id: pasta.indexOf(pst),
            type: "article",
            title: "Паста про " + fn.substr(0, fn.lastIndexOf(".")),
            description: pst,
            input_message_content: {
                message_text: pst.substr(0, 4090),
            },
            thumb_url: "https://media.discordapp.net/attachments/736635915065360492/852532903270678568/815666924095668285.png"
        }
    }));
})

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));