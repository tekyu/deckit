import React from 'react';

import { Story, Meta } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import DashboardComponent from './Dashboard';

export default {
  title: 'Pages/Dashboard',
  component: DashboardComponent,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story = (args) => <DashboardComponent {...args} />;

export const Dashboard = Template.bind({});

Dashboard.args = {
};
