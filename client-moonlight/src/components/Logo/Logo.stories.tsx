import React from 'react';

import { Story, Meta } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import LogoComponent from './Logo';

export default {
  title: 'Components/Logo',
  component: LogoComponent,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story = (args) => <LogoComponent {...args} />;

export const Logo = Template.bind({});
