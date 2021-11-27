import { Story, Meta } from '@storybook/react';

import { IPlayerCounter } from 'components/PlayerCounter/IPlayerCounter';
import PlayerCounterComponent from './PlayerCounter';

export default {
  title: 'Components/PlayerCounter',
  component: PlayerCounterComponent,
} as Meta;

const Template: Story<IPlayerCounter> = (args) => <PlayerCounterComponent {...args} />;

export const PlayerCounter = Template.bind({});

PlayerCounter.args = {
  max: 4,
  current: 1,
};
