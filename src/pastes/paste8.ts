import { readFileSync } from "fs";

export const content: string = readFileSync(`${process.cwd()}/src/raw/8.txt`, "utf-8");
export const name: string = "тяночку";
export const description: string = content;
export const id: number = 8;
