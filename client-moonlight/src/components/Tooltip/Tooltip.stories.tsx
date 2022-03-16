/* eslint-disable jsx-a11y/anchor-is-valid */
import { Story, Meta } from '@storybook/react';

import { ITooltip } from 'components/Tooltip/ITooltip';
import TooltipComponent from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: TooltipComponent,
} as Meta;

const Template: Story<ITooltip> = (args) => (
  <>
    <a data-tip data-for="storybook-tooltip-show">Test tooltip</a>
    <TooltipComponent {...args} />
  </>
);

export const Tooltip = Template.bind({});

Tooltip.args = {
  children: 'Tooltip',
  id: 'storybook-tooltip-show',
  tooltipProps: {
    effect: 'float',
  },
};
