import { Story, Meta } from '@storybook/react';

import { IStartGameButton } from 'components/StartGameButton/IStartGameButton';
import StartGameButtonComponent from './StartGameButton';

export default {
  title: 'Components/StartGameButton',
  component: StartGameButtonComponent,
} as Meta;

const Template: Story<IStartGameButton> = (args) => <StartGameButtonComponent {...args} />;

export const StartGameButton = Template.bind({});

StartGameButton.args = {
  arePlayersReady: false,
};
