export type ChatLog = Chat[];

export type Chat = { role: "system" | "user" | "assistant"; content: string };
