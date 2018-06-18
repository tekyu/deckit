export const GAME_AUTH = 'GAME_AUTH';
export const LOCAL_STORAGE = 'LOCAL_STORAGE';
export const UUID = 'UUID';
export const UPDATE_SERVERS = 'UPDATE_SERVERS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
export const SELECTED_CARD = 'SELECTED_CARD';
// export const INITIAL_PLAYERS = 'INITIAL_PLAYERS';

// export const saveInitialPlayers = players => {
//     console.log('action saveInitialPlayers',players);
//     return {
//         type:INITIAL_PLAYERS,
//         payload: {
//             players:players
//         }
//     }
// }


export const startGame = (socket,props) => {
    return dispatch => {
        console.log('action startGame');
        socket.emit('readyToWait');
        dispatch({
            type: GAME_AUTH,
            payload: {
                ...props,
                auth:true
            }
        })
    }
}

// export const initialPlayers = (socket,players) => {
//     return dispatch => {
//         // socket.emit('')
//         console.log('action initialPlayers');
//         dispatch(saveInitialPlayers(players));
//         // this.props.socket.on('playersInWaitingRoom',players => {
//         //     console.log('playersInWaitingRoom',players);            
//         //     dispatch(saveInitialPlayers(players));
//         // });

//     }
// }

export const playerConnect = (socket,nickname) => {
    return dispatch => {
        console.log('[emiting] getUUID [in] playerConnect');
        socket.emit('getUUID',nickname);
    }
}

export const createServer = (socket,serverData) => {
    return dispatch => {
        console.log('[emiting] createServer [in] createServer');
        socket.emit('createServer',serverData);
        // socket.on('updateServer',data=>{
        //     dispatch({
        //         type: UPDATE_SERVERS,
        //         payload: {
        //             servers:data
        //         }
        //     })
        // });
    }
}

export const joinServer = (socket,serverData) => {
    return dispatch => {
        console.log('[emiting] joinServer [in] joinServer');
        socket.emit('joinServer',serverData.id);
    }
}

export const updateServers = (servers) => {
    return dispatch => {
        dispatch({
            type:UPDATE_SERVERS,
            payload: {
                servers:servers
            }
        })
    }
}

export const updateRoom = (socket) => {
    return dispatch => {
        socket.on('updateRoom',data => {
            console.log('[actions.js] updateRoom',data);
            dispatch({
                type:UPDATE_ROOM,
                payload: {
                    roomInfo:data
                }
            })
        });
    }
}

export const getInitialRoomInfo = (socket) => {
    return dispatch => {
        socket.on('roomCreated',(data)=> {
            console.log('[Actions.js] roomCreated');
            dispatch({
                type:CREATE_ROOM,
                payload: {
                }
            });
        })
        socket.on('roomJoined',(data)=> {
            console.log('[Actions.js] roomJoined');
            dispatch({
                type:JOIN_ROOM,
                payload: {
                }
            });
        })
    }
}