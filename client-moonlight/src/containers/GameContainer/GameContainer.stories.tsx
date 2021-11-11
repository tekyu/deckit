import { Story, Meta } from '@storybook/react';

import IGameContainer from 'containers/GameContainer/IGameContainer';
import GameContainerComponent from './GameContainer';

export default {
  title: 'Containers/GameContainer',
  component: GameContainerComponent,
} as Meta;

const Template: Story<IGameContainer> = (args) => (
  <GameContainerComponent {...args} />);
export const GameContainer = Template.bind({});

GameContainer.args = {
  children: 'GameContainer',
};
