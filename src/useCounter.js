import { useState, useCallback } from "react";

const useCounter = ({ intervalIdRef, delay, initialCountValue = 0, incrementCountValue = 1 }) => {
  const [countValue, setCountValue] = useState(initialCountValue);

  const DELAY = delay;

  const incrementCount = useCallback(() => {
    setCountValue((count) => count + incrementCountValue);
  }, [incrementCountValue]);

  const decremementCount = useCallback(() => {
    setCountValue(initialCountValue);
  }, [initialCountValue]);

  const onMouseClick = () => {
    if (!intervalIdRef.current) {
      intervalIdRef.current = setInterval(() => {
        incrementCount();
      }, DELAY);
    }
  };

  const onMouseClickLeft = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      decremementCount();
      intervalIdRef.current = undefined;
    }
  };

  return { onMouseClickLeft, onMouseClick, countValue };
};

export default useCounter;
