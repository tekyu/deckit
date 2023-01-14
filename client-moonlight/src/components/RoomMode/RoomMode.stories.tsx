import { Story, Meta } from '@storybook/react';

import { IRoomMode } from 'components/RoomMode/IRoomMode';
import { ROOM_MODE } from 'store/room/roomInterfaces';
import RoomModeComponent from './RoomMode';

export default {
  title: 'Components/RoomMode',
  component: RoomModeComponent,
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['private', 'public', 'fast'],
    },
  },
} as Meta;

const Template: Story<IRoomMode> = (args) => <RoomModeComponent {...args} />;

export const RoomMode = Template.bind({});

RoomMode.args = {
  mode: ROOM_MODE.private,
};
