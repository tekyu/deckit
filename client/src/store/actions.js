export const GAME_AUTH = 'GAME_AUTH';
export const LOCAL_STORAGE = 'LOCAL_STORAGE';
export const UUID = 'UUID';
export const UPDATE_SERVERS = 'UPDATE_SERVERS';
export const CREATE_ROOM = 'CREATE_ROOM';
export const UPDATE_ROOM = 'UPDATE_ROOM';
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

export const getInitialRoomInfo = (socket) => {
    return dispatch => {
        socket.on('joinedToServer',(props)=> {
            console.log('[Actions.js] joinedToServer',props);
            dispatch({
                type:CREATE_ROOM,
                payload: {
                    roomInfo: props
                }
            })
        })
        
        // socket.emit('')
    }
}