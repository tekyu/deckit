import { paletteType, variantType } from 'theme/themes';

export type buttonVersionType = 'text' | 'contained' | 'outlined';

export default interface IButton {
  children?: React.ReactNode;
  palette?: paletteType;
  variant?: variantType;
  version?: buttonVersionType;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  disabled?: boolean;
};
