import Room from '../classes/Room';
const mocks = [
  {
    name: 'AAA Room created last',
    playersMax: 8,
    mode: 'public',
    gameCode: 'd',
    gameOptions: {
      decks: ['default'],
    },
  },
  {
    name: 'BBB Room created first',
    playersMax: 6,
    mode: 'public',
    gameCode: 'd',
    gameOptions: {
      decks: ['default'],
    },
  },
  {
    name: 'CCC Room created second',
    playersMax: 10,
    mode: 'public',
    gameCode: 'd',
    gameOptions: {
      decks: ['default'],
    },
  },
  {
    name: 'mock room from server',
    playersMax: 4,
    mode: 'public',
    gameCode: 'd',
    gameOptions: {
      decks: ['default'],
    },
  },
];

// const mockRooms = mocks.map((data, i) => {
//   return new Room(data, `mock${i}`);
// });
const mockRooms = mocks.reduce((acc, data, i) => {
  const roomInstance = new Room(data, `mock${i}`);
  acc[roomInstance.id] = roomInstance;
  return acc;
}, {});

export default mockRooms;
