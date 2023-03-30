// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { openai } from "@/lib/openai";
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionResponseMessage } from "openai";
import { ChatLog } from "../../../typings";

type Data = {
  reply: ChatCompletionResponseMessage | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const chatLog: ChatLog = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatLog,
    });

    res.status(200).json({ reply: response.data.choices[0].message });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}
