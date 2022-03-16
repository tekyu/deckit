import { Story, Meta } from '@storybook/react';

import { IScoreboardItem } from 'components/ScoreboardItem/IScoreboardItem';
import ScoreboardItemComponent from './ScoreboardItem';

export default {
  title: 'Components/ScoreboardItem',
  component: ScoreboardItemComponent,
} as Meta;

const Template: Story<IScoreboardItem> = (args) => <ScoreboardItemComponent {...args} />;

export const ScoreboardItem = Template.bind({});

ScoreboardItem.args = {
  isHinter: true,
  owner: 'owner-id',
  id: 'user-id',
  username: 'username',
  position: 1,
  score: 12,
};
