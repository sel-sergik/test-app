import { useEffect, useRef, useState } from 'react';

export const useTimeout = (callback: () => void, initialDelay: number) => {
  const savedCallback = useRef(() => {});
  const [delay, setDelay] = useState(initialDelay);
  const min = 30;
  const max = 120;

  const getRandTimeValue = () => 
    Math.floor(Math.random() * (max - min + 1) + min);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
      setDelay(getRandTimeValue() * 1000);
    }

    if (delay !== null) {
      const id = setTimeout(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};