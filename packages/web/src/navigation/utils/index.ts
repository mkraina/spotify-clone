import { BaseSyntheticEvent } from 'react';

export * from './withParams';

export const stopEventPropagation = (e: BaseSyntheticEvent) => e.stopPropagation();
