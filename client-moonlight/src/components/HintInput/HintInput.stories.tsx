import { Story, Meta } from '@storybook/react';

import HintInputComponent from './HintInput';

export default {
  title: 'Components/HintInput',
  component: HintInputComponent,
} as Meta;

const Template: Story = (args) => <HintInputComponent {...args} />;

export const HintInput = Template.bind({});

HintInput.args = {
  children: 'HintInput',
};
