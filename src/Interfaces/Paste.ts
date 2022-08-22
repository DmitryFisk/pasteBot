import type { Telegraf } from "telegraf";
import { readFileSync } from "fs";

enum PasteType {
    s = "Говно",
    g = "Тяночку", 
    m = "Мистику",
    t = "Тест"
}

function generatePasteID(bot: Telegraf): number {
    let id = bot.pastes.length;
    return id++;
}

export function generatePaste(input: string, bot: Telegraf): any {
    const data = readFileSync(input, "utf8");
    return {
        content: data,
        type: PasteType[input.split("/").pop().substr(0, 1)],
        description: data.substr(0, 70) + "...",
        id: generatePasteID(bot)
    }
}
