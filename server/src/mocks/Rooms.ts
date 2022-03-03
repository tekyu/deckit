import { CreateRoomOptions } from '../classes/Deckit';
import Room from '../classes/Room';

const mocks: CreateRoomOptions[] = [
  {
    name: 'AAA Room created last',
    playersMax: 8,
    mode: 'public',
    gameCode: 'd',

  },
  {
    name: 'BBB Room created first',
    playersMax: 6,
    mode: 'public',
    gameCode: 'd',

  },
  {
    name: 'CCC Room created second',
    playersMax: 10,
    mode: 'public',
    gameCode: 'd',
  },
  {
    name: 'mock room from server',
    playersMax: 4,
    mode: 'public',
    gameCode: 'd',

  },
];

const mockRooms = mocks.reduce((acc, data, i) => {
  const roomInstance = new Room(data, `mock${i}`);
  // eslint-disable-next-line no-param-reassign
  acc[roomInstance.id] = roomInstance;
  return acc;
}, {});

export default mockRooms;
