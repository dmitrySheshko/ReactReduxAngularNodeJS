import { START_CALL, END_CALL, SET_REMOTE_CALL_USER, REMOVE_REMOTE_CALL_USER } from '../../common/constants/const';

export function setRemoteCallUser(user){
    return {
        type: SET_REMOTE_CALL_USER,
        user
    }
}

export function removeRemoteCallUser(){
    return {
        type: REMOVE_REMOTE_CALL_USER
    }
}

export function startCall(){
    return {
        type: START_CALL
    }
}

export function endCall(){
    return {
        type: END_CALL
    }
}