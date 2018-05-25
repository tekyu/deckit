import * as actionTypes from './actions';
import initialState from './initial-state';

const simpleState = (state,action) => {
    console.log('Reducer SIMPLESTATE',state,action);
    return {
        ...state,
        ...action
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOCAL_STORAGE: 
        return simpleState(state, {nickname: action.payload.nickname,uuid:action.payload.uuid});
        // return {
        //     ...state,
        //     nickname: action.payload.nickname,
        //     uuid: action.payload.uuid
        // };
        case actionTypes.GAME_AUTH: 
        console.log('Reducer game auth',action);
        return simpleState(state, action.payload);
        // return {
        //     ...state,
        //     nickname:action.payload.nickname,
        //     auth:true
        // };
        case actionTypes.UUID:
        return simpleState(state, {uuid:action.payload.uuid});
        // return {
        //     ...state,
        //     uuid:action.payload.uuid
        // }
        case actionTypes.INITIAL_PLAYERS:
        return simpleState(state, {players:action.payload.players})
        default: 
        return state;
    }
};

export default reducer;