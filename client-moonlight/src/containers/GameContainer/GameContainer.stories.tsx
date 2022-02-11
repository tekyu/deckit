import { Story, Meta } from '@storybook/react';
import { PARAM_REDUX_MERGE_STATE } from 'addon-redux';

import IGameContainer from 'containers/GameContainer/IGameContainer';
import { cloneDeep } from 'lodash';
import { mockStore } from 'mocks/store';
import StoryRouter from 'storybook-react-router';
import styled from 'styled-components';
import GameContainerComponent from './GameContainer';

const mockStoreGC = cloneDeep(mockStore);
// @ts-ignore
mockStoreGC.game.stage = 3;

export default {
  title: 'Containers/GameContainer',
  component: GameContainerComponent,
  decorators: [StoryRouter()],
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: JSON.stringify(mockStoreGC),
  },
} as Meta;

const Container = styled.div`
  display: flex;
  min-height: 90vh;
  border: 2px dashed red;
  height: 90vh;
  align-items: stretch;
`;

const Template: Story<IGameContainer> = (args) => (
  <Container><GameContainerComponent {...args} /></Container>);
export const GameContainer = Template.bind({});

GameContainer.args = {
  children: 'GameContainer',
};
