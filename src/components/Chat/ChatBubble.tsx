import { AiOutlineRobot } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import Timer from "./Timer";

interface Props {
  role: "assistant" | "system" | "user";
  message: string;
}

const ChatBubble = ({ role, message }: Props) => {
  return role === "assistant" ? (
    <div className="flex items-center gap-2 mx-1 my-2 md:mx-0">
      <AiOutlineRobot className="p-2.5 rounded-full w-12 h-12 bg-base-300" />
      <p className="max-w-[280px] md:max-w-2xl px-6 py-3 whitespace-pre-line rounded-2xl bg-accent text-accent-content shadow-2xl">
        {message}
      </p>
      {/* <Timer start={10} /> */}
    </div>
  ) : role === "user" ? (
    <div className="flex items-center justify-end gap-2 mx-1 my-2 md:mx-0">
      <p className="max-w-[280px] md:max-w-2xl px-6 py-3 text-black whitespace-pre-line bg-gray-300 shadow-2xl rounded-2xl">
        {message}
      </p>
      <HiUser className="p-2.5 rounded-full w-12 h-12 bg-base-300" />
    </div>
  ) : null;
};

export default ChatBubble;
