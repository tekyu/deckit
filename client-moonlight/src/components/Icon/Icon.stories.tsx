import React from 'react';

import { Story, Meta } from '@storybook/react';

import IIcon from 'components/Icon/IIcon';
import { BiPlus } from 'react-icons/bi';
import IconComponent from './Icon';

export default {
  title: 'Components/Icon',
  component: IconComponent,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: Story<IIcon> = (args) => <IconComponent {...args} />;

export const Icon = Template.bind({});

Icon.args = {
  clickable: true,
  color: 'primary',
  children: <BiPlus size={24} />,
};
