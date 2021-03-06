import React, { lazy } from "react";
import ScoreIcon from "../components/Generic/Icons/ScoreIcon";
import ChatIcon from "../components/Generic/Icons/ChatIcon";

export const gameMapping = {
  d: {
    name: `Deckit`,
    panels: {
      score: { listener: `scoreUpdate`, data: [], icon: <ScoreIcon /> },
      chat: { listener: `incomingChatMessage`, data: [], icon: <ChatIcon /> }
      // log: { listener: `incomingLog`, data: [] },
      // settings: { listener: `roomSettings`, data: [] }
    },
    allowedPlayers: 10
  },
  k: {
    name: `Karcianka`,
    panels: {
      score: {},
      chat: {},
      log: {}
    },
    allowedPlayers: 10
  }
};

export const listGameMapping = index => {
  return index;
};

export const getGames = index => {
  return index ? Object.keys(gameMapping)[index] : Object.values(gameMapping);
};

export const getGameMapping = game => {
  if (!gameMapping[game]) {
    throw Error(`Game ${game} is not defined within mapping`);
  }
  return gameMapping[game];
};

export const getGame = gameCode => {
  switch (gameCode) {
    case `d`:
      return lazy(() => import(`../containers/Deckit/Deckit`));
    default:
      throw Error(`Game doesn't exist`);
  }
};
