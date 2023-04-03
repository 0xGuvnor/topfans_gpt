import { AiOutlineRobot } from "react-icons/ai";

const TypingAnimation = () => {
  return (
    <div className="flex items-center gap-2 mx-1 my-2 md:mx-0">
      <AiOutlineRobot className="p-2.5 rounded-full w-12 h-12 bg-base-300" />
      <div className="flex max-w-[120px] justify-center px-6 py-3 space-x-2 bg-accent rounded-2xl">
        <div className="w-4 h-4 rounded-full bg-accent-content animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-accent-content animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-accent-content animate-pulse"></div>
      </div>
    </div>
  );
};
export default TypingAnimation;
