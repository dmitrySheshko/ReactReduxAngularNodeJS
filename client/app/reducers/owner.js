import { SET_OWNER, REMOVE_OWNER, CREATE_WS, REMOVE_WS } from '../../common/constants/const';

const initialState = {
    owner: {},
    ws: {}
};

const ownerReducer = function(state = initialState, action){
    switch (action.type){
        case SET_OWNER:
            return { ...state, owner: action.owner };
        case REMOVE_OWNER:
            return { ...state, owner: {} };
        case CREATE_WS:
            return {...state, ws: action.ws};
        case REMOVE_WS:
            state.ws.socket.close();
            return {...state, ws: {}};
        default :
            return state;
    }
};

export default ownerReducer;