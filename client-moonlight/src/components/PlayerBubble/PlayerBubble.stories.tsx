import { Story, Meta } from '@storybook/react';

import { IPlayerBubble } from 'components/PlayerBubble/IPlayerBubble';
import PlayerBubbleComponent from './PlayerBubble';

export default {
  title: 'Components/PlayerBubble',
  component: PlayerBubbleComponent,
} as Meta;

const Template: Story<IPlayerBubble> = (args) => <PlayerBubbleComponent {...args} />;

export const PlayerBubble = Template.bind({});

PlayerBubble.args = {
  color: '#B1C5FC',
  ready: false,
  adminPower: true,
  you: true,
  isOwner: true,
  username: 'Freebell Bite',
  id: 'fsd30423rwerf343dwe',
  anonymous: true,
};
