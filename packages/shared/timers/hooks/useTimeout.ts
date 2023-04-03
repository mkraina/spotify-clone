import { useCallback, useEffect, useRef } from 'react';

export default (callback: () => void, timeout: number): (() => void) => {
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;

    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);

    return cancel;
  }, [callback, timeout, cancel]);

  return cancel;
};
