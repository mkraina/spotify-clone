import { useEffect } from 'react';
import useEventCallback from 'use-event-callback';

export const useScrollListener = (callback: (e: HTMLElement) => void) => {
  const eventCallback = useEventCallback(callback);
  useEffect(() => {
    const onScroll = () => eventCallback(document.documentElement);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [eventCallback]);
};

export const useScrollEndReached = (callback: () => void) => {
  useScrollListener(e => {
    if (e.scrollTop + e.clientHeight < e.scrollHeight) return;
    callback();
  });
};
