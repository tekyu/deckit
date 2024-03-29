import { ROOM_MODE } from 'store/room/roomInterfaces';
import { RootState } from 'store/store';

export const mockStore: Partial<RootState> = {
  user: {
    id: 'LCRzOg6DNc9BLsjRAAAP',
    username: 'Freebell Bite',
    anonymous: true,
    initialized: true,
    state: 1,
    kickedFrom: {},
    _persist: {
      version: -1,
      rehydrated: true,
    },
  },
  room: {
    _persist: {
      version: -1,
      rehydrated: true,
    },
    activeRoomId: 'privateroom39',
    mode: ROOM_MODE.private,
    playersMax: 8,
    gameCode: 'd',
    name: 'Ripplehowler Lancer',
    id: 'privateroom39',
    owner: 'LCRzOg6DNc9BLsjRAAAP',
    admin: 'LCRzOg6DNc9BLsjRAAAP',
    playerLimit: 10,
    scoreboard: {
      LCRzOg6DNc9BLsjRAAAP: 2,
      LCRzOg6DNc9BLsjRAAA3: 12,
      LCRzOg6DNc9BLsj00002: 4,
      LCRzOg6DNc9BLsj00003: 0,
      LCRzOg6DNc9BLsj00004: 7,
    },
    players: [{
      color: '#B1FCC4',
      username: 'Freebell Bite',
      id: 'LCRzOg6DNc9BLsjRAAAP',
      anonymous: true,
      state: 0,
      score: 12,
    },
    {
      color: '#B1FOC4',
      username: 'RainChill Tiger',
      id: 'LCRzOg6DNc9BLsjRAAA3',
      anonymous: true,
      state: 0,
      score: 37,
    },
    {
      color: '#F3CCC4',
      username: 'Howling Moose',
      id: 'LCRzOg6DNc9BLsj00002',
      anonymous: true,
      state: 0,
      score: 43,
    },
    {
      color: '#b1fcea',
      username: 'Crystalant Venom',
      id: 'LCRzOg6DNc9BLsj00003',
      anonymous: true,
      state: 0,
      score: 1,
    },
    {
      color: '#c0b1fc',
      username: 'Slypiper Fly',
      id: 'LCRzOg6DNc9BLsj00004',
      anonymous: true,
      state: 0,
      score: 2,
    },
    ],
    state: 0,
    winners: [],
    playAgain: [],

  },
  game: {
    remainingCards: 240,
    hinter: {
      id: 'LCRzOg6DNc9BLsjRAAAP',
      username: 'Freebell Bite',
    },
    stage: 0,
    round: 0,
    maxScore: 60,
    myCards: [{ id: '1', title: 'Card 1', url: 'http://localhost:3011/card/1.jpg' }, { id: '2', title: 'Card 2', url: 'http://localhost:3011/card/2.jpg' }, { id: '3', title: 'Card 3', url: 'http://localhost:3011/card/3.jpg' }, { id: '4', title: 'Card 4', url: 'http://localhost:3011/card/4.jpg' }, { id: '5', title: 'Card 5', url: 'http://localhost:3011/card/5.jpg' }],
    hintPickedByMe: '',
    hintCardPickedByMe: '',
    pickedCardFromMyDeck: '',
    pickedCardFromBoard: '',
    playersPickedCardFromDeck: [],
    playersPickedCardFromBoard: [],
    cardsForBoard: [],
    hint: '',
  },
};
