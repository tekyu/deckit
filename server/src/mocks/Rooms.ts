import Room from "../classes/Room";

const mocks = [
  {
    name: "AAA Room created last",
    playersMax: 8,
    isPublic: true,
    gameCode: "d",
    gameOptions: {
      decks: ["standard"]
    }
  },
  {
    name: "BBB Room created first",
    playersMax: 6,
    isPublic: false,
    gameCode: "d",
    gameOptions: {
      decks: ["wholesome", "countries"]
    }
  },
  {
    name: "CCC Room created second",
    playersMax: 10,
    isPublic: true,
    gameCode: "d",
    gameOptions: {
      decks: ["wholesome", "countries"]
    }
  },
  {
    name: "mock room from server",
    playersMax: 4,
    isPublic: true,
    gameCode: "d",
    gameOptions: {
      decks: ["wholesome", "countries"]
    }
  }
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
