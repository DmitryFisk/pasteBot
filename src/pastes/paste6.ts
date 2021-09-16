import { readFileSync } from "fs";

export const content: string = readFileSync(`${process.cwd()}/src/raw/6.txt`, "utf-8");
export const name: string = "мистику";
export const description: string = content;
export const id: number = 6;
