export interface IIncrement {
  onChange: (value: number) => void;
  children?: React.ReactNode;
  value?: number;
  iconSize?: number;
  step?: number;
}
