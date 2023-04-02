import { MouseEventHandler } from 'react';

export * from './withParams';

export const stopEventPropagation: MouseEventHandler<HTMLAnchorElement> &
  MouseEventHandler<HTMLSpanElement> = e => e.stopPropagation();
