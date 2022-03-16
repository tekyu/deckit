import { Story, Meta } from '@storybook/react';

import { IScoreboardHeader } from 'components/ScoreboardHeader/IScoreboardHeader';
import ScoreboardHeaderComponent from './ScoreboardHeader';

export default {
  title: 'Components/ScoreboardHeader',
  component: ScoreboardHeaderComponent,
} as Meta;

const Template: Story<IScoreboardHeader> = (args) => <ScoreboardHeaderComponent {...args} />;

export const ScoreboardHeader = Template.bind({});

ScoreboardHeader.args = {
  round: 12,
  maxScore: 60,
  remainingCards: 255,
};
