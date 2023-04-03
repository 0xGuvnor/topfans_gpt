import { initialPrompt } from "@/constants";
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatLog } from "../../../typings";
import ChatBubble from "./ChatBubble";
import TypingAnimation from "./TypingAnimation";
import StartingMessage from "./StartingMessage";
import { RiSendPlaneFill } from "react-icons/ri";

const Chat = () => {
  const [chatLog, setChatLog] = useState<ChatLog>([initialPrompt]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const chatRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message) {
      setChatLog((prev) => [...prev, { role: "user", content: message }]);
      setMessage("");
    }
  };

  const sendMessage = async () => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/chatgpt`;

    setIsLoading(true);
    try {
      const res = await axios.post(url, chatLog);

      setChatLog((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply.content },
      ]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // useEffect is used here as the useState hook is async in nature,
    // and the chatLog state update will not take into effect yet if
    // sendMesssage() is placed inside handleSubmit

    // Placing sendMessage() in useEffect ensures that the function is only called once the chatLog state has been updated
    const latestChatIndex = chatLog.length - 1;
    if (chatLog[latestChatIndex].role === "user") {
      sendMessage();
      scrollToBottom();
    } else if (chatLog[latestChatIndex].role !== "user") {
      scrollToBottom();
    }
  }, [chatLog]);

  useEffect(() => {
    // Makes sure the input field is focused on page load
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100dvh-104px)]">
      <main className="flex-1 overflow-y-scroll">
        {chatLog.map((chat, id) => (
          <ChatBubble key={id} role={chat.role} message={chat.content} />
        ))}
        {isLoading && <TypingAnimation />}
        {chatLog.length === 1 && <StartingMessage />}
        <div ref={chatRef}></div>
      </main>

      <form
        onSubmit={handleSubmit}
        className="flex items-center px-6 py-2 m-3 rounded-xl bg-neutral text-neutral-content md:my-6 md:mx-0"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 text-lg bg-transparent placeholder:text-neutral-content/50 focus:outline-none"
        />
        <button type="submit">
          <RiSendPlaneFill
            onClick={() => inputRef.current?.focus()}
            className={`${
              message && "cursor-pointer opacity-100 hover:bg-neutral-focus"
            } opacity-25 w-10 h-10 rounded-lg p-1.5`}
          />
        </button>
      </form>
    </div>
  );
};
export default Chat;
