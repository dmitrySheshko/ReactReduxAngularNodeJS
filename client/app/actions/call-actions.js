import { OUTGOING_CALL, END_CALL, SET_RECEIVER, REMOVE_RECEIVER, INGOING_CALL, VIDEO_ACCESS, AUDIO_ACCESS, START_CALL } from '../../common/constants/const';

export function setRemoteCallUser(user){
    return {
        type: SET_RECEIVER,
        user
    }
}

export function outgoingCall(){
    return {
        type: OUTGOING_CALL
    }
}

export function endCall(){
    return {
        type: END_CALL
    }
}

export function setIngoingCall(caller){
    return {
        type: INGOING_CALL,
        caller
    }
}

export function changeVideoAccess(){
    return {
        type: VIDEO_ACCESS
    }
}

export function changeAudioAccess(){
    return {
        type: AUDIO_ACCESS
    }
}

export function startCall(){
    return {
        type: START_CALL
    }
}