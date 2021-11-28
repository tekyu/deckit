import { Story, Meta } from '@storybook/react';
import { ARG_REDUX_PATH, PARAM_REDUX_MERGE_STATE } from 'addon-redux';
import { IWaitingScreen } from 'containers/WaitingScreen/IWaitingScreen';
import WaitingScreenComponent from './WaitingScreen';

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
      id: 'LCRzOg6DNc9BLsj00001',
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
};

export default {
  title: 'Pages/WaitingScreen',
  component: WaitingScreenComponent,
  parameters: {
    [PARAM_REDUX_MERGE_STATE]: JSON.stringify(mockStore),
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      [ARG_REDUX_PATH]: 'room.name',
    },
    mode: {
      control: { type: 'radio' },
      [ARG_REDUX_PATH]: 'room.mode',
      options: ['private', 'public'],
    },
    playersMax: {
      control: { type: 'number' },
      [ARG_REDUX_PATH]: 'room.playersMax',
    },
    state: {
      control: { type: 'radio' },
      [ARG_REDUX_PATH]: 'room.state',
      options: [0, 1],
    },
    players: {
      control: { type: 'object' },
      [ARG_REDUX_PATH]: 'room.players',
    },
  },
} as Meta;
const Template: Story<IWaitingScreen> = (args) => (
  <WaitingScreenComponent {...args} />
);

export const WaitingScreen = Template.bind({});

WaitingScreen.args = {
  leaveHandler: () => { },
};
