import { Story, Meta } from '@storybook/react';
import { PARAM_REDUX_MERGE_STATE } from 'addon-redux';

import StoryRouter from 'storybook-react-router';
import DeckComponent from './Deck';

const mockStore = {
  user: {
    id: 'LCRzOg6DNc9BLsjRAAAP',
  },
  room: {
    activeRoomId: 'privateroom39',
    mode: 'private',
    playersMax: 8,
    gameCode: 'd',
    name: 'Ripplehowler Lancer',
    id: 'privateroom39',
    owner: 'LCRzOg6DNc9BLsjRAAAP',
    admin: 'LCRzOg6DNc9BLsjRAAAP',
    players: [{
      color: '#B1FCC4',
      username: 'Freebell Bite',
      id: 'LCRzOg6DNc9BLsjRAAAP',
      anonymous: true,
      state: 0,
    },
    {
      color: '#B1FOC4',
      username: 'RainChill Tiger',
      id: 'LCRzOg6DNc9BLsjRAAAP',
      anonymous: true,
      state: 0,
    },
    {
      color: '#F3CCC4',
      username: 'Howling Moose',
      id: 'LCRzOg6DNc9BLsj00002',
      anonymous: true,
      state: 0,
    },
    {
      color: '#b1fcea',
      username: 'Crystalant Venom',
      id: 'LCRzOg6DNc9BLsj00003',
      anonymous: true,
      state: 0,
    },
    {
      color: '#c0b1fc',
      username: 'Slypiper Fly',
      id: 'LCRzOg6DNc9BLsj00004',
      anonymous: true,
      state: 0,
    },
    ],
    state: 0,
  },
  game: {
    remainingCards: [{ id: 6, title: 'Card 6', url: '' }, { id: 7, title: 'Card 7', url: '' }, { id: 8, title: 'Card 8', url: '' }, { id: 9, title: 'Card 9', url: '' }, { id: 10, title: 'Card 10', url: '' }, { id: 11, title: 'Card 11', url: '' }, { id: 12, title: 'Card 12', url: '' }, { id: 13, title: 'Card 13', url: '' }, { id: 14, title: 'Card 14', url: '' }, { id: 15, title: 'Card 15', url: '' }, { id: 16, title: 'Card 16', url: '' }, { id: 17, title: 'Card 17', url: '' }, { id: 18, title: 'Card 18', url: '' }, { id: 19, title: 'Card 19', url: '' }, { id: 20, title: 'Card 20', url: '' }, { id: 21, title: 'Card 21', url: '' }, { id: 22, title: 'Card 22', url: '' }, { id: 23, title: 'Card 23', url: '' }, { id: 24, title: 'Card 24', url: '' }, { id: 25, title: 'Card 25', url: '' }, { id: 26, title: 'Card 26', url: '' }, { id: 27, title: 'Card 27', url: '' }, { id: 28, title: 'Card 28', url: '' }, { id: 29, title: 'Card 29', url: '' }, { id: 30, title: 'Card 30', url: '' }],
    hinter: {
      id: '',
      username: '',
    },
    stage: 0,
    round: 0,
    myCards: [{ id: 1, title: 'Card 1', url: 'http://localhost:3011/card/1.jpg' }, { id: 2, title: 'Card 2', url: 'http://localhost:3011/card/2.jpg' }, { id: 3, title: 'Card 3', url: 'http://localhost:3011/card/3.jpg' }, { id: 4, title: 'Card 4', url: 'http://localhost:3011/card/4.jpg' }, { id: 5, title: 'Card 5', url: 'http://localhost:3011/card/5.jpg' }],
  },
};

export default {
  title: 'Containers/Deck',
  component: DeckComponent,
  decorators: [StoryRouter()],
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: JSON.stringify(mockStore),
  },
} as Meta;

const Template: Story = (args) => <DeckComponent {...args} />;

export const Deck = Template.bind({});

Deck.args = {
  children: 'Deck',
};
