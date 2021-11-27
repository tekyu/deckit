import React from 'react';

import { Story, Meta } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import { Provider } from 'react-redux';
import { store } from 'store/store';
import HeaderComponent from './Header';

export default {
  title: 'Components/Header',
  component: HeaderComponent,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story = (args) => (
  <Provider store={store}>
    <HeaderComponent {...args} />
  </Provider>
);

export const Header = Template.bind({});
