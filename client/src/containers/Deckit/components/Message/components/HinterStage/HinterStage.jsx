import React from "react";
import HinterPlayer from "./components/HinterPlayer";

const HinterStage = ({ hinter: { id } = {}, userId }) => {
  if (id === userId) {
    return `You are choosing the hint. Field will apear after you choose a card`;
  }
  return <HinterPlayer hinterId={id} />;
};

export default HinterStage;
