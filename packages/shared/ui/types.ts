type PlaceholderProps<T> = Partial<Omit<T, 'isPlaceholder'>> & {
  isPlaceholder: true;
};

export type PropsWithPlaceholder<T> = (T & { isPlaceholder?: false }) | PlaceholderProps<T>;
