import { createAsyncThunk } from '@reduxjs/toolkit';
import { socketActions, socketTopics } from 'store/socket/socket';

const changeMaxScore = createAsyncThunk(
  'room/changeMaxScore',
  async ({ maxScore }: { maxScore: number }, { dispatch }) => {
    dispatch(socketActions.emit(socketTopics.game.updateMaxScore, { maxScore }));
  },
);

export const gameThunks = {
  changeMaxScore,
};
