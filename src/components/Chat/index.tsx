import { initialPrompt } from "@/constants";
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { ChatLog } from "../../../typings";
import ChatBubble from "./ChatBubble";
import TypingAnimation from "./TypingAnimation";

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
      <div className="flex-1 overflow-y-scroll">
        {chatLog.map((chat, id) => (
          <ChatBubble key={id} role={chat.role} message={chat.content} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 my-2">
            <AiOutlineRobot className="p-2.5 rounded-full w-12 h-12 bg-base-300" />
            <TypingAnimation />
          </div>
        )}
        <div ref={chatRef}></div>
      </div>

      <form onSubmit={handleSubmit} className="flex my-6 space-x-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-6 py-2 text-lg rounded-full bg-neutral text-neutral-content focus:outline-none"
        />
        <button
          type="submit"
          onClick={() => inputRef.current?.focus()}
          className="text-lg btn btn-primary"
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default Chat;
