const { Telegraf } = require("telegraf");
const bot = new Telegraf(require("./config.json").token);
const utils = require("./utils.js");
const pastes = [];

utils.load(pastes);
console.log(pastes);

bot.on("inline_query", async (ctx) => {
    bot.pastes.forEach(paste => {
          ctx.answerInlineQuery(pst => {
              return {
                  id: pst.id,
                  type: "article",
                  title: `Paste about ${pst.title}`, //no rus layout moment :sadge:
                  description: pst.desc,
                  input_message_content: {
                      message_text: pst.substr(0, 4090),
                  },
                  thumb_url: pst.image
  
              }
          });
      });

/*    const sp = pasta.filter(p => p.toUpperCase().includes(ctx.inlineQuery.query.toUpperCase()));


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
    }));*/})

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
