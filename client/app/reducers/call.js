import { START_CALL, END_CALL, SET_REMOTE_CALL_USER, REMOVE_REMOTE_CALL_USER } from '../../common/constants/const';

const initialState = {
    outgoingCall: false,
    ingoingCall: false,
    startCall: false,
    remoteUser: {}
};

const ownerReducer = function(state = initialState, action){
    switch (action.type){
        case SET_REMOTE_CALL_USER:
            return { ...state, remoteUser: action.user };
        case REMOVE_REMOTE_CALL_USER:
            return { ...state, remoteUser: {} };
        case START_CALL:
            return { ...state, outgoingCall: true };
        case END_CALL:
            return { ...state, outgoingCall: false };
        default :
            return state;
    }
};

export default ownerReducer;