const mockRooms = [
  {
    id: '123',
    name: 'AAA Room created last',
    createdBy: 'CCC User',
    createdById: '345',
    createdAt: '1541888514200',
    playersCurrent: '5',
    playersMax: '10',
    isPublic: true,
    gameCode: 'u',
    gameOptions: {
      decks: ['standard']
    }
  },
  {
    id: '1234',
    name: 'BBB Room created first',
    createdBy: 'BBB User',
    createdById: '345',
    createdAt: '1541888514000',
    playersCurrent: '3',
    playersMax: '10',
    isPublic: false,
    gameCode: 'h',
    gameOptions: {
      decks: ['wholesome', 'countries']
    }
  },
  {
    id: '12345',
    name: 'CCC Room created second',
    createdBy: 'AAA User',
    createdById: '345',
    createdAt: '1541888514100',
    playersCurrent: '7',
    playersMax: '10',
    isPublic: true,
    gameCode: 'j',
    gameOptions: {
      decks: ['wholesome', 'countries']
    }
  }
];

export default mockRooms;
