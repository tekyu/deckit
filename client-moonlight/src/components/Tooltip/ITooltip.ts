import { TooltipProps } from 'react-tooltip';

export interface ITooltip {
  children?: React.ReactNode;
  id: string;
  tooltipProps?: TooltipProps;
}
