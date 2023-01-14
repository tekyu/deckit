import { Story, Meta } from '@storybook/react';

import { IIncrement } from 'components/Increment/IIncrement';
import IncrementComponent from './Increment';

export default {
  title: 'Components/Increment',
  component: IncrementComponent,
} as Meta;

const Template: Story<IIncrement> = (args) => <IncrementComponent {...args} />;

export const Increment = Template.bind({});

Increment.args = {
  children: 'Increment',
};
