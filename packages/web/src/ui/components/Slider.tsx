import { useState } from 'react';
import { Slider as PaperSlider, SliderProps } from '@mui/material';

export const Slider: React.FC<
  Omit<SliderProps, 'onChange' | 'onChangeCommited'> & {
    onValueChange?: (value: number) => void;
  }
> = ({ onValueChange, ...props }) => {
  const [innerValue, setInnerValue] = useState<number>();
  return (
    <PaperSlider
      {...props}
      value={innerValue ?? props.value}
      onChange={(e, value) => typeof value === 'number' && setInnerValue(value)}
      onChangeCommitted={(e, value) => {
        typeof value === 'number' && onValueChange?.(value);
        setInnerValue(undefined);
      }}
    />
  );
};
