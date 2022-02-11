import { Story, Meta } from '@storybook/react';
import { PARAM_REDUX_MERGE_STATE } from 'addon-redux';

import { IWinners } from 'components/Winners/IWinners';
import { cloneDeep } from 'lodash';
import { mockStore } from 'mocks/store';
import StoryRouter from 'storybook-react-router';
import WinnersComponent from './Winners';

const mockStoreGC = cloneDeep(mockStore);
// @ts-ignore
mockStoreGC.room.playAgain = [mockStoreGC.room.players[0].id, mockStoreGC.room.players[1].id];

export default {
  title: 'Components/Winners',
  component: WinnersComponent,
  decorators: [StoryRouter()],
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: JSON.stringify(mockStoreGC),
  },
} as Meta;

const Template: Story<IWinners> = (args) => <WinnersComponent {...args} />;

export const Winners = Template.bind({});

Winners.args = {
  children: 'Winners',
};
