import { useRef, useEffect } from "react";

const useInterval = (callback: Function, delay?: number | null) => {
  const savedCallback = useRef<Function>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);

      //清除定时器
      return () => clearInterval(interval);
    }
  }, [delay]);
};

export default useInterval;
