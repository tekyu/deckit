import { lazy } from "react";

// export const gameMapping = {
//   d: "Deckit",
//   k: "Karcianka"
// };

export const gameMapping = {
  d: {
    name: "Deckit",
    panels: ["score", "chat", "log", "settings"]
  },
  k: {
    name: "Karcianka",
    panels: ["score", "chat"]
  }
};

export const listGameMapping = index => {
  return index;
};

export const getGames = index => {
  if (typeof index !== "undefined") {
    return Object.keys(gameMapping)[index];
  }
  return Object.values(gameMapping);
};

export const getGameMapping = game => {
  if (!gameMapping[game]) {
    throw Error(`Game ${game} is not defined within mapping`);
  }
  return gameMapping[game];
};

export const getGame = gameCode => {
  switch (gameCode) {
    case "d":
      return lazy(() => import("../containers/Deckit/Deckit"));
    default:
      throw Error(`Game doesn't exist`);
  }
};
