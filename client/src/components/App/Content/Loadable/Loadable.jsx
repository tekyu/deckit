import Loadable from "react-loadable";
import React from "react";

const Browse = Loadable({
  loader: () => import(`../Browse/Browse`),
  loading() {
    return <p>Loading...</p>;
  }
});

const CreateGame = Loadable({
  loader: () => import(`containers/CreateGame/CreateGame`),
  loading() {
    return <p>Loading...</p>;
  }
});

const GameContainer = Loadable({
  loader: () => import(`../GameContainer/GameContainer`),
  loading() {
    return <p>Loading...</p>;
  }
});

export { Browse, CreateGame, GameContainer };
