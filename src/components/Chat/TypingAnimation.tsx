const TypingAnimation = () => {
  return (
    <div className="flex max-w-[120px] justify-center px-6 py-4 space-x-2 bg-accent rounded-2xl">
      <div className="w-4 h-4 rounded-full bg-accent-content animate-pulse"></div>
      <div className="w-4 h-4 rounded-full bg-accent-content animate-pulse"></div>
      <div className="w-4 h-4 rounded-full bg-accent-content animate-pulse"></div>
    </div>
  );
};
export default TypingAnimation;
