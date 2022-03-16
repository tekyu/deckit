import { Story, Meta } from '@storybook/react';

import PublicRoomListComponent from './PublicRoomList';

export default {
  title: 'Components/PublicRoomList',
  component: PublicRoomListComponent,
} as Meta;

const Template: Story = (args) => <PublicRoomListComponent {...args} />;

export const PublicRoomList = Template.bind({});

PublicRoomList.args = {
  children: 'PublicRoomList',
};
