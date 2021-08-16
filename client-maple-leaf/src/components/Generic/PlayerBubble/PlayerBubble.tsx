import React from 'react';
import * as Styled from './PlayerBubble.styled';

export interface IPlayerBubble {
  avatar?: string;
  color?: string;
  didPick?: boolean;
}

const PlayerBubble = ({ avatar = '', color = '#fff', didPick = false }: IPlayerBubble): JSX.Element => (
  <Styled.Container avatar={avatar} color={color} didPick={didPick} />
);

export default PlayerBubble;
