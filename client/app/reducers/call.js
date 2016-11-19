import { OUTGOING_CALL, END_CALL, SET_RECEIVER, REMOVE_RECEIVER, INGOING_CALL, VIDEO_ACCESS, AUDIO_ACCESS, ACCEPT_INGOING_CALL, START_CALL, SET_CREATE_OFFER, SET_ON_ICE, SET_CREATE_ANSWER, CREATE_ANSWER, SET_ON_ANSWER, ANSWER, ICE, LOCAL_STREAM, REMOTE_STREAM } from '../../common/constants/const';

const initialState = {
    outgoingCall: false,
    ingoingCall: false,
    startCall: false,
    receiver: {},
    caller: {},
    audioAccess: true,
    videoAccess: true,
    localStream: null,
    remoteStream: null,
    createOffer: null,
    createAnswer: null,
    onIce: null,
    onAnswer: null
};

const ownerReducer = function(state = initialState, action){
    switch (action.type){
        case SET_RECEIVER:
            return { ...state, receiver: action.user };
        case OUTGOING_CALL:
            return { ...state, outgoingCall: true };
        case END_CALL:
            URL.revokeObjectURL(state.localStream);
            URL.revokeObjectURL(state.remoteStream);
            state.localStream.getTracks().forEach(function (track) {
                track.stop();
            });
            return { ...state, outgoingCall: false, ingoingCall: false, startCall: false, receiver: {}, caller: {}, localStream: null, remoteStream: null };
        case INGOING_CALL:
            return { ...state, ingoingCall: true, caller: action.caller };
        case VIDEO_ACCESS:
            console.log('videoAccess: ', action.videoAccess);
            let videoAccess = !state.videoAccess;
            if(action.videoAccess !== undefined){
                videoAccess = action.videoAccess;
            }
            if(state.localStream && state.localStream.getVideoTracks()[0]){
                state.localStream.getVideoTracks()[0].enabled = videoAccess;
            }
            return { ...state, videoAccess: videoAccess };
        case AUDIO_ACCESS:
            console.log('audioAccess: ', action.audioAccess);
            let audioAccess = !state.audioAccess;
            if(action.audioAccess !== undefined){
                audioAccess = action.audioAccess;
            }
            if(state.localStream && state.localStream.getAudioTracks()[0]){
                state.localStream.getAudioTracks()[0].enabled = audioAccess;
            }
            /*if(state.localStream && state.localStream.getAudioTracks()[0]){
                if(action.audioAccess === undefined) {
                    state.localStream.getAudioTracks()[0].enabled = !state.audioAccess;
                }
                else {
                    state.localStream.getAudioTracks()[0].enabled = action.audioAccess;
                }
            }*/
            return { ...state, audioAccess: audioAccess };
        case ACCEPT_INGOING_CALL:
            return { ...state, startCall: true, ingoingCall: false };
        case SET_CREATE_OFFER:
            return { ...state, createOffer: action.createOffer };
        case SET_ON_ANSWER:
            return { ...state, onAnswer: action.onAnswer };
        case SET_ON_ICE:
            return { ...state, onIce: action.onIce };
        case START_CALL:
            if(state.createOffer !== null) {
                state.createOffer();
            }
            return { ...state, startCall: true, outgoingCall: false };
        case SET_CREATE_ANSWER:
            return { ...state, createAnswer: action.createAnswer };
        case CREATE_ANSWER:
            if(state.createAnswer !== null) {
                state.createAnswer(action.offer);
            }
            return state;
        case ANSWER:
            if(state.onAnswer !== null) {
                state.onAnswer(action.answer);
            }
            return state;
        case ICE:
            if(state.onIce !== null) {
                state.onIce(action.ice);
            }
            return state;
        case LOCAL_STREAM:
            return { ...state, localStream: action.stream };
            break;
        case REMOTE_STREAM:
            return { ...state, remoteStream: action.stream };
            break;
        default :
            return state;
    }
};

export default ownerReducer;