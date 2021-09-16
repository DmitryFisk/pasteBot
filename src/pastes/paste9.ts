import { readFileSync } from "fs";

export const content: string = readFileSync(`${process.cwd()}/src/raw/9.txt`, "utf-8");
export const name: string = "говно";
export const description: string = content;
export const id: number = 9;
