import React from 'react';

import { Story, Meta } from '@storybook/react';

import CreateGameComponent from './CreateGame';

export default {
  title: 'Pages/Create',
  component: CreateGameComponent,
} as Meta;

const Template: Story = (args) => <CreateGameComponent {...args} />;

export const Create = Template.bind({});
