import React from 'react';

export interface ICreateGame {
  children?: React.ReactNode;
}

export interface IFormValues {
  gameCode: string;
  name: string;
  playersMax: number;
  maxScore: number;
  isPrivate: boolean;
}
