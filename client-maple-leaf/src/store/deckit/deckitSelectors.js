import { createSelector } from 'reselect';

export const chosenCardsToMatchHint = createSelector(
  (state) => state.deckit,
  ({ pickedCard = {} }) => pickedCard,
);

export const gameOptions = createSelector(
  (state) => state.deckit,
  (gameOptions) => gameOptions || {},
);

export const gameStage = createSelector(
  (state) => state.deckit,
  ({ stage = null }) => stage,
);

export const hint = createSelector(
  (state) => state.deckit,
  ({ hint = '' }) => hint,
);

export const hintCard = createSelector(
  (state) => state.deckit,
  ({ hintCard = null }) => hintCard,
);

export const hinter = createSelector(
  (state) => state.deckit,
  ({ hinter = {} }) => hinter,
);

export const maxScore = createSelector(
  (state) => state.deckit,
  ({ maxScore }) => maxScore,
);

export const myCard = createSelector(
  (state) => state.deckit,
  ({ myCard = null }) => myCard,
);

export const myCards = createSelector(
  (state) => state.deckit,
  ({ cards }) => cards || [],
);

export const pickedCard = createSelector(
  (state) => state.deckit,
  ({ pickedCard = null }) => pickedCard,
);

export const pickedCardsToHint = createSelector(
  (state) => state.deckit,
  ({ pickedCardsToHint = [] }) => pickedCardsToHint,
);

export const playersPickedCard = createSelector(
  (state) => state.deckit,
  ({ playersPickedCard = [] }) => playersPickedCard,
);

export const playersChoosedCard = createSelector(
  (state) => state.deckit,
  ({ playersChoosedCard = [] }) => playersChoosedCard,
);

export const blockHand = createSelector(
  (state) => state.deckit,
  ({ blockHand = false }) => blockHand,
);

export const blockPickingArea = createSelector(
  (state) => state.deckit,
  ({ blockPickingArea = false }) => blockPickingArea,
);

export const round = createSelector(
  (state) => state.deckit,
  ({ round = 1 }) => round,
);

export const remainingCards = createSelector(
  (state) => state.deckit,
  ({ remainingCards = 0 }) => remainingCards,
);
