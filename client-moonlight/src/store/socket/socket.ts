export const socketTypes = {
  emit: 'SOCKET_EMIT',
  leave: 'SOCKET_LEAVE',
  listener: 'SOCKET_LISTENER',
  removeListener: 'SOCKET_REMOVE_LISTENER',
};

export const socketTopics = {
  user: {
    updateAnonUser: 'MOONLIGHT-UPDATE_ANON_USER',
  },
  room: {
    createRoom: 'MOONLIGHT-CREATE_ROOM',
    joinRoom: 'MOONLIGHT-JOIN_ROOM',
    updateRoom: 'MOONLIGHT-UPDATE_ROOM',
  },
  player: {
    kick: 'MOONLIGHT-KICK_PLAYER',
  },
};

interface ISocketData {
  [key: string]: any;
}

export const emit = (event: string, data?: ISocketData, handler?: any): any => ({
  type: socketTypes.emit,
  payload: data,
  event,
  handler,
});

export const listener = (event: string, handler?: any) => ({
  type: socketTypes.listener,
  handler,
  event,
});

export const removeListener = (event: string, handler: any) => ({
  type: socketTypes.removeListener,
  handler,
  event,
});

export const socketActions = {
  emit, listener, removeListener,
};
