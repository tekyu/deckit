const mockRooms = [
  {
    id: `123`,
    name: `AAA Room created last`,
    createdBy: `CCC User`,
    createdById: `345`,
    createdAt: `1541888514200`,
    playersCurrent: `5`,
    playersMax: `10`,
    isPublic: true,
    gameCode: `u`,
    gameOptions: {
      decks: [`standard`],
      chat: [
        {
          id: `12qw34`,
          ownerId: `5qw43`,
          ownerName: `blabla`,
          timestamp: 1573382208916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12q34`,
          ownerId: `543qwe`,
          ownerName: `blabla`,
          timestamp: 1573382218917,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12d34`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382228918,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123g4`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382238916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123h4`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382248916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123cc4`,
          ownerId: `5qqe43`,
          ownerName: `blabla`,
          timestamp: 1573382258916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12ss34`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382268916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123sa4`,
          ownerId: `5423`,
          ownerName: `blabla1`,
          timestamp: 1573382278916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123gdf4`,
          ownerId: `567543`,
          ownerName: `blabla2`,
          timestamp: 1573382288916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123ytht4`,
          ownerId: `234543`, // ownerId should be an object, returned from server; reduce computing on front side
          ownerName: `blabla3`,
          timestamp: 1573382298916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blablanbvdesr dfdgdgdfdfd fdsfdsfdsfdf sfsdfsdfsdfs`
        }
      ]
    }
  },
  {
    id: `1234`,
    name: `BBB Room created first`,
    createdBy: `BBB User`,
    createdById: `345`,
    createdAt: `1541888514000`,
    playersCurrent: `3`,
    playersMax: `10`,
    isPublic: false,
    gameCode: `h`,
    gameOptions: {
      decks: [`wholesome`, `countries`],
      chat: [
        {
          id: `12qw34`,
          ownerId: `5qw43`,
          ownerName: `blabla`,
          timestamp: 1573382208916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12q34`,
          ownerId: `543qwe`,
          ownerName: `blabla`,
          timestamp: 1573382218917,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12d34`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382228918,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123g4`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382238916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123h4`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382248916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123cc4`,
          ownerId: `5qqe43`,
          ownerName: `blabla`,
          timestamp: 1573382258916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12ss34`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382268916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123sa4`,
          ownerId: `5423`,
          ownerName: `blabla1`,
          timestamp: 1573382278916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123gdf4`,
          ownerId: `567543`,
          ownerName: `blabla2`,
          timestamp: 1573382288916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123ytht4`,
          ownerId: `234543`, // ownerId should be an object, returned from server; reduce computing on front side
          ownerName: `blabla3`,
          timestamp: 1573382298916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blablanbvdesr dfdgdgdfdfd fdsfdsfdsfdf sfsdfsdfsdfs`
        }
      ]
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
    isPublic: true,
    gameCode: `j`,
    gameOptions: {
      decks: [`wholesome`, `countries`],
      chat: [
        {
          id: `12qw34`,
          ownerId: `5qw43`,
          ownerName: `blabla`,
          timestamp: 1573382208916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12q34`,
          ownerId: `543qwe`,
          ownerName: `blabla`,
          timestamp: 1573382218917,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12d34`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382228918,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123g4`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382238916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123h4`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382248916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123cc4`,
          ownerId: `5qqe43`,
          ownerName: `blabla`,
          timestamp: 1573382258916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `12ss34`,
          ownerId: `543`,
          ownerName: `blabla`,
          timestamp: 1573382268916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123sa4`,
          ownerId: `5423`,
          ownerName: `blabla1`,
          timestamp: 1573382278916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123gdf4`,
          ownerId: `567543`,
          ownerName: `blabla2`,
          timestamp: 1573382288916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blabla`
        },
        {
          id: `123ytht4`,
          ownerId: `234543`, // ownerId should be an object, returned from server; reduce computing on front side
          ownerName: `blabla3`,
          timestamp: 1573382298916,
          color: `#FFAB87`,
          avatar: `https://via.placeholder.com/40x40`,
          message: `blablanbvdesr dfdgdgdfdfd fdsfdsfdsfdf sfsdfsdfsdfs`
        }
      ]
    }
  }
];

export default mockRooms;
