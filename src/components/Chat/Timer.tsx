import { useEffect, useState } from "react";

interface Props {
  start: number;
}

const Timer = ({ start }: Props) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    // Exit when we reach 0
    if (count === 0) return;

    // Sets up an interval that decreases the count by 1 every second
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className={`${
        count <= 5
          ? "bg-error text-error-content"
          : "bg-warning text-warning-content"
      } flex items-center justify-center w-16 h-16 rounded-2xl text-2xl transition-colors duration-300 ease-in-out`}
    >
      {count}
    </div>
  );
};
export default Timer;
