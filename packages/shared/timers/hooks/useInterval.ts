import { useEffect } from 'react';

const useInterval = (callback: () => void, delay: number): void => {
  useEffect(() => {
    if (!delay) return;
    const id = setInterval(callback, delay);

    return () => clearInterval(id);
  }, [callback, delay]);
};

export default useInterval;
