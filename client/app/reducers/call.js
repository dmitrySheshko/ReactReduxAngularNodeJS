import { OUTGOING_CALL, END_CALL, SET_RECEIVER, REMOVE_RECEIVER, INGOING_CALL } from '../../common/constants/const';

const initialState = {
    outgoingCall: false,
    ingoingCall: false,
    startCall: false,
    receiver: {},
    caller: {},
    audioAccess: true,
    videoAccess: true,
    audioStream: null,
    videoStream: null
};

const ownerReducer = function(state = initialState, action){
    switch (action.type){
        case SET_RECEIVER:
            return { ...state, receiver: action.user };
        case OUTGOING_CALL:
            return { ...state, outgoingCall: true };
        case END_CALL:
            //TODO: remove streams
            return { ...state, outgoingCall: false, ingoingCall: false, startCall: false, receiver: {}, caller: {} };
        case INGOING_CALL:
            return { ...state, ingoingCall: true, caller: action.caller };
        default :
            return state;
    }
};

export default ownerReducer;