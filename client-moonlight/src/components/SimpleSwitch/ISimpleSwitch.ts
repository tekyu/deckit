import { paletteType } from 'theme/themes';

export default interface ISwitch {
  name: string;
  value: boolean;
  onChange?: (checked: boolean) => void;
};
