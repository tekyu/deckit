const mockRooms = [
  {
    id: `123`,
    name: `AAA Room created last`,
    createdBy: `CCC User`,
    createdById: `345`,
    createdAt: `1541888514200`,
    playersCurrent: `5`,
    playersMax: `10`,
    mode: "public",
    gameCode: `u`,
    gameOptions: {
      decks: [`standard`],
      chat: []
    }
  },
  {
    id: `12345678`,
    name: `BBB Room created first`,
    createdBy: `BBB User`,
    createdById: `345`,
    createdAt: `1541888514000`,
    playersCurrent: `3`,
    playersMax: `10`,
    mode: "public",
    gameCode: `h`,
    gameOptions: {
      decks: [`wholesome`, `countries`],
      chat: []
    }
  },
  {
    id: `12345`,
    name: `CCC Room created second`,
    createdBy: `AAA User`,
    createdById: `345`,
    createdAt: `1541888514100`,
    playersCurrent: `7`,
    playersMax: `10`,
    mode: "public",
    gameCode: `j`,
    gameOptions: {
      decks: [`wholesome`, `countries`],
      chat: []
    }
  }
];

export default mockRooms;
