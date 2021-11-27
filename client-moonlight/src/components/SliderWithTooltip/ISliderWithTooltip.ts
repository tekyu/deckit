import { paletteType } from 'theme/themes';

export default interface ISliderWithTooltip {
  name: string;
  children?: React.ReactNode;
  onChange?: (value: number) => void;
  palette?: paletteType;
  label?: string;
  height?: number;
  sliderProps?: {
    min?: number;
    max?: number;
    defaultValue?: number;
    step?: number;
  }
}
