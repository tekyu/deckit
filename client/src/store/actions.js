export const GAME_AUTH = 'GAME_AUTH';
export const LOCAL_STORAGE = 'LOCAL_STORAGE';
export const UUID = 'UUID';
export const INITIAL_PLAYERS = 'INITIAL_PLAYERS';

export const saveInitialPlayers = players => {
    console.log('action saveInitialPlayers',players);
    return {
        type:INITIAL_PLAYERS,
        payload: {
            players:players
        }
    }
}


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

export const initialPlayers = (socket,players) => {
    return dispatch => {
        // socket.emit('')
        console.log('action initialPlayers');
        dispatch(saveInitialPlayers(players));
        // this.props.socket.on('playersInWaitingRoom',players => {
        //     console.log('playersInWaitingRoom',players);            
        //     dispatch(saveInitialPlayers(players));
        // });

    }
}

export const playerConnect = (socket,nickname) => {
    return dispatch => {
        console.log('action playerConnect');
        socket.emit('getUUID',nickname);
    }
}