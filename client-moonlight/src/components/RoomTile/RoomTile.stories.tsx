import { Story, Meta } from '@storybook/react';
import sillyname from 'sillyname';

import { IRoomTile } from 'components/RoomTile/IRoomTile';
import RoomTileComponent from './RoomTile';

export default {
  title: 'Components/RoomTile',
  component: RoomTileComponent,
} as Meta;

const Template: Story<IRoomTile> = (args) => <RoomTileComponent {...args} />;

export const RoomTile = Template.bind({});

RoomTile.args = {
  id: '123',
  name: sillyname(),
  players: 4,
  playersMax: 10,
  owner: sillyname(),
  onJoin: () => { },
};
