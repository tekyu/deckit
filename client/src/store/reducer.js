import * as actionTypes from "./actions";
import initialState from "./initial-state";

const simpleState = (state, action) => {
    return {
        ...state,
        ...action
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOCAL_STORAGE:
            return simpleState(state, {
                nickname: action.payload.nickname,
                uuid: action.payload.uuid
            });
        case actionTypes.GAME_AUTH:
            return simpleState(state, action.payload);
        case actionTypes.UUID:
            return simpleState(state, { uuid: action.payload.uuid });
        case actionTypes.UPDATE_SERVERS:
            return simpleState(state, { servers: action.payload.servers });
        case actionTypes.CREATE_ROOM:
            return {
                ...state,
                shouldRenderRoom: true
            };
        case actionTypes.JOIN_ROOM:
            return {
                ...state,
                shouldRenderRoom: true
            };
        case actionTypes.UPDATE_ROOM:
            return {
                ...state,
                roomInfo: {
                    ...action.payload.roomInfo,
                    playersConnected: [
                        ...action.payload.roomInfo.playersConnected
                    ]
                }
            };
        case actionTypes.SELECTED_CARD:
            return simpleState(state, { selectedCard: action.payload.data });
        default:
            return state;
    }
};

export default reducer;
