import { ITooltip } from 'components/Tooltip/ITooltip';
import ReactTooltip from 'react-tooltip';
import * as Styled from './Tooltip.styled';

const Tooltip = ({
  children = 'Default',
  id,
  tooltipProps = {},
}: ITooltip): JSX.Element => (
  <Styled.Tooltip>
    <ReactTooltip
      id={id}
      className="moonlight-tooltip-override"
      {...tooltipProps}
    >
      {children}
    </ReactTooltip>
  </Styled.Tooltip>
);

export default Tooltip;
