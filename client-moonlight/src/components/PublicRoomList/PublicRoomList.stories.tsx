import { Story, Meta } from '@storybook/react';

import PublicRoomListComponent from './PublicRoomList';

export default {
  title: 'Components/PublicRoomList',
  component: PublicRoomListComponent,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story = (args) => <PublicRoomListComponent {...args} />;

export const PublicRoomList = Template.bind({});

PublicRoomList.args = {
  children: 'PublicRoomList',
};
