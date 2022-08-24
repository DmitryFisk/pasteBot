import { readFile } from "fs/promises";
import { basename } from "path";

type PasteType = "s" | "g" | "m" | "t";
const pasteTypeToName = {
    s: "говно",
    g: "тяночку",
    m: "мистику",
    t: "тест"
};

type PasteData = {
    type: PasteType;
    text: string;
};

export class Paste {
    private type: PasteType;
    text: string;

    constructor(data: PasteData) {
        this.type = data.type;
        this.text = data.text;
    }

    static async fromFile(path: string) {
        const text = await readFile(path, "utf-8");

        return new Paste({
            type: basename(path)[0] as PasteType,
            text
        });
    }

    get title() {
        return `Паста про ${pasteTypeToName[this.type]}`;
    }

    get shortDesc() {
        const useEllipsis = this.text.length > 70;
        return this.text.slice(0, 70) + (useEllipsis ? "…" : "");
    }

    matches(query: string) {
        const textCompare = this.text.toUpperCase();
        const typeCompare = pasteTypeToName[this.type].toUpperCase();
        const queryCompare = query.toUpperCase();

        return [textCompare, typeCompare].some((text) => text.includes(queryCompare));
    }
}
