import { Story, Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

import AccountBoxComponent from './AccountBox';

export default {
  title: 'Components/AccountBox',
  component: AccountBoxComponent,
} as Meta;

const Template: Story = (args) => (
  <Provider store={store}>
    <AccountBoxComponent {...args} />
  </Provider>
);

export const AccountBox = Template.bind({});

AccountBox.args = {
  children: 'AccountBox',
};
