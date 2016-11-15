import { OUTGOING_CALL, END_CALL, SET_RECEIVER, REMOVE_RECEIVER, INGOING_CALL, VIDEO_ACCESS, AUDIO_ACCESS, ACCEPT_INGOING_CALL, SET_CREATE_OFFER, START_CALL, SET_ON_ICE, SET_ON_ANSWER, SET_CREATE_ANSWER, CREATE_ANSWER, ANSWER, ICE } from '../../common/constants/const';

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

export function acceptIngoingCall(){
    return {
        type: ACCEPT_INGOING_CALL
    }
}

export function setCreateOffer(createOffer){
    return {
        type: SET_CREATE_OFFER,
        createOffer
    }
}

export function setOnIce(onIce){
    return {
        type: SET_ON_ICE,
        onIce
    }
}

export function startCall(){
    return {
        type: START_CALL
    }
}

export function setCreateAnswer(createAnswer){
    return {
        type: SET_CREATE_ANSWER,
        createAnswer
    }
}

export function createAnswer(offer){
    return {
        type: CREATE_ANSWER,
        offer
    }
}

export function setOnAnswer(onAnswer){
    return {
        type: SET_ON_ANSWER,
        onAnswer
    }
}

export function onAnswer(answer){
    return {
        type: ANSWER,
        answer
    }
}

export function onIce(ice){
    return {
        type: ICE,
        ice
    }
}