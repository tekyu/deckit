import React from 'react';

import { Story, Meta } from '@storybook/react';

import INavItem from 'components/NavItem/INavItem';
import StoryRouter from 'storybook-react-router';
import NavItemComponent from './NavItem';

export default {
  title: 'Components/NavItem',
  component: NavItemComponent,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story<INavItem> = (args) => <NavItemComponent {...args} />;

export const NavItem = Template.bind({});

NavItem.args = {
  children: 'Nav Item',
  comingSoon: false,
};

export const ComingSoon = Template.bind({});

ComingSoon.args = {
  children: 'Nav Item',
  comingSoon: true,
};
