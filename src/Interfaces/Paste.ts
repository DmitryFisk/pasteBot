export interface Paste {
    content: string;
    name: string;
    description: string.substr(0, 70) + "...";
    id: number;
    image?: string;
}
