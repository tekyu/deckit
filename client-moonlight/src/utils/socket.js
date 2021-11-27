import React from 'react';
import socketio from 'socket.io-client';

const mockUrl = 'http://localhost:3012/';

export const socket = socketio.connect(mockUrl);
export const SocketContext = React.createContext();

export const topics = {
  UPDATE_ANON_USER: 'MOONLIGHT-UPDATE_ANON_USER',
};
