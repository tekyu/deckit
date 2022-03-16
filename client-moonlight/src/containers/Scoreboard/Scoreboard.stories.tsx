import { Story, Meta } from '@storybook/react';
import { PARAM_REDUX_MERGE_STATE } from 'addon-redux';

import { mockStore } from 'mocks/store';
import StoryRouter from 'storybook-react-router';
import ScoreboardComponent from './Scoreboard';

export default {
  title: 'Containers/Scoreboard',
  component: ScoreboardComponent,
  decorators: [StoryRouter()],
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: JSON.stringify(mockStore),
  },
} as Meta;

const Template: Story = (args) => <ScoreboardComponent {...args} />;

export const Scoreboard = Template.bind({});
