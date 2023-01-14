export const socketTypes = {
  emit: 'SOCKET_EMIT',
  leave: 'SOCKET_LEAVE',
  listener: 'SOCKET_LISTENER',
  removeListener: 'SOCKET_REMOVE_LISTENER',
};

export const socketTopics = {
  user: {
    updateAnonUser: 'MOONLIGHT-UPDATE_ANON_USER',
    syncBasicInfo: 'SYNC_BASIC_INFO',
  },
  room: {
    getFullListOfRooms: 'MOONLIGHT-GET_FULL_LIST_OF_ROOMS',
    createRoom: 'MOONLIGHT-CREATE_ROOM',
    joinRoom: 'MOONLIGHT-JOIN_ROOM',
    updateRoom: 'MOONLIGHT-UPDATE_ROOM',
    leave: 'MOONLIGHT-LEAVE_ROOM',
    start: 'MOONLIGHT-START_GAME',
    updateNumberOfSeats: 'MOONLIGHT-UPDATE_NUMBER_OF_SEATS',
    playAgain: 'MOONLIGHT-PLAY_AGAIN',
    reconnect: 'MOONLIGHT-RECONNECT',
    denyReconnecting: 'MOOLIGHT-DENY_RECONNECTING',
    updateListOfRooms: 'MOONLIGHT-UPDATE_LIST_OF_ROOMS',
    updateRoomMode: 'MOOLIGHT-UPDATE_ROOM_MODE',
  },
  player: {
    kick: 'MOONLIGHT-KICK_PLAYER',
    kicked: 'MOONLIGHT-KICKED_PLAYER',
    changeState: 'MOONLIGHT-CHANGE-USER-STATE',
  },
  game: {
    updateMyCards: 'MOONLIGHT-UPDATE_MY_CARDS',
    update: 'MOONLIGHT-UPDATE_GAME',
    sendHint: 'MOONLIGHT-SEND_HINT',
    started: 'MOONLIGHT-GAME_STARTED',
    sendCardFromDeck: 'MOONLIGHT-CARD_FROM_DECK',
    sendCardFromBoard: 'MOONLIGHT-CARD_FROM_BOARD',
    nextRound: 'MOONLIGHT-NEXT_ROUND',
    kickDisconnectedPlayers: 'MOOLIGHT-KICK_DISCONNECTED_PLAYERS',
    resetRound: 'MOONLIGHT-RESET_ROUND',
    updateMaxScore: 'MOONLIGHT-UPDATE_MAX_SCORE',
  },
};

interface ISocketData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface IEmitResponse {
  type: string;
  payload: ISocketData | undefined;
  event: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any;
}

interface IListenerResponse {
  type: string;
  event: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any;
}

interface IRemoveListenerResponse {
  type: string;
  event: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any;
}

export const emit = (event: string, data?: ISocketData, handler?: unknown): IEmitResponse => ({
  type: socketTypes.emit,
  payload: data,
  event,
  handler,
});

export const listener = (event: string, handler?: unknown): IListenerResponse => ({
  type: socketTypes.listener,
  handler,
  event,
});

export const removeListener = (event: string, handler: unknown): IRemoveListenerResponse => ({
  type: socketTypes.removeListener,
  handler,
  event,
});

export const socketActions = {
  emit, listener, removeListener,
};
