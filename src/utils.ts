import { readdir } from "fs/promises";
import { resolve } from "path";
import { generatePaste } from "./Interfaces/Paste";
import type { Telegraf } from "telegraf";

/**
 * Extremely specific function to get paths of files in a directory
 * matching the specified file extension.
 * @author dengr1065
 * @param {string} dir Directory where to search
 * @param {string} ext Extension to filter files with
 */
export async function getFilesWithExt(dir: string, ext: string): any[] {
    return (await readdir(dir))
        .filter((file) => file.endsWith(ext))
        .map((file) => resolve(dir, file));
}

/**
 * Absolutely useless function due to me being a shithead
 * @author DmitryFisk
 * @param {Telegraf} bot The bot instance
 */
export async function generatePastes(bot: Telegraf): Promise<void> {
    const rawPasteFiles: any = await getFilesWithExt(`${__dirname}/./raw/`, `.txt`);

    for (let rawPasteFile of rawPasteFiles) {
        const paste: any = generatePaste(rawPasteFile, bot);
        bot.pastes.push(paste);
    }
}
