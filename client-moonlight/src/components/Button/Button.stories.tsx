import React from 'react';

import { Story, Meta } from '@storybook/react';

import IButton from 'components/Button/IButton';
import ButtonComponent from './Button';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    palette: {
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      control: {
        type: 'radio',
      },
    },
    variant: {
      options: ['light', 'main', 'dark'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: Story<IButton> = (args) => <ButtonComponent {...args} />;

export const Button = Template.bind({});

Button.args = {
  children: 'Button',
};
