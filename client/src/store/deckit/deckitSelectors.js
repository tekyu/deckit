import { createSelector } from "reselect";

export const chosenCardsToMatchHint = createSelector(
  state => state.deckit,
  ({ pickedCard = {} }) => pickedCard
);

export const gameOptions = createSelector(
  state => state.deckit,
  gameOptions => gameOptions || {}
);

export const gameStage = createSelector(
  state => state.deckit,
  ({ stage = null }) => stage
);

export const hint = createSelector(
  state => state.deckit,
  ({ hint = `` }) => hint
);

export const hintCard = createSelector(
  state => state.deckit,
  ({ hintCard = null }) => hintCard
);

export const hinter = createSelector(
  state => state.deckit,
  ({ hinter = {} }) => hinter
);

export const maxScore = createSelector(
  state => state.deckit,
  ({ maxScore }) => maxScore
);

export const myCard = createSelector(
  state => state.deckit,
  ({ myCard = null }) => myCard
);

export const myCards = createSelector(
  state => state.deckit,
  ({ cards }) => cards || []
);

export const pickedCard = createSelector(
  state => state.deckit,
  ({ pickedCard = null }) => pickedCard
);

export const pickedCardsToHint = createSelector(
  state => state.deckit,
  ({ pickedCardsToHint = [] }) => pickedCardsToHint
);

export const playersPickedCard = createSelector(
  state => state.deckit,
  ({ playersPickedCard = [] }) => playersPickedCard
);
