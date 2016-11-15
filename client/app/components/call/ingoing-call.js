import React from 'react';

import { REJECT_CALL, ACCEPT_CALL, ANSWER, ICE } from '../../../common/constants/const';

class IngoingCall extends React.Component {

    constructor(props){
        super(props);

        this.PeerConnection = null;
        this.IceCandidate = null;
        this.SessionDescription = null;
        this.pc = null;
        this.PC_CONFIG = null;
        this.ices = [];

        this.rejectCall = this.rejectCall.bind(this);
        this.acceptCall = this.acceptCall.bind(this);
        this.acceptAudioCall = this.acceptAudioCall.bind(this);
        this.sendRejectMessage = this.sendRejectMessage.bind(this);
        this.sendAccessMessage = this.sendAccessMessage.bind(this);
        this.createAnswer = this.createAnswer.bind(this);
        this.onIce = this.onIce.bind(this);
        this.answerSuccessCallback = this.answerSuccessCallback.bind(this);
        this.gotAnswerIceCandidate = this.gotAnswerIceCandidate.bind(this);
        this.gotRemoteStream = this.gotRemoteStream.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.gotAnswerLocalDescription = this.gotAnswerLocalDescription.bind(this);
        this.errorCallback = this.errorCallback.bind(this);
    }

    componentWillMount(){

    }

    rejectCall(){
        this.sendRejectMessage();
        this.props.actions.endCall();
    }

    acceptAudioCall(){
        this.props.actions.changeVideoAccess();
        this.acceptCall();
    }

    acceptCall(){
        this.props.actions.setCreateAnswer(this.createAnswer);
        this.props.actions.setOnIce(this.onIce);
        this.props.actions.acceptIngoingCall();
        this.sendAccessMessage();
    }

    sendRejectMessage(){
        if(this.props.actions.sendMessage){
            this.props.actions.sendMessage({
                type: REJECT_CALL,
                params: {
                    receiver: this.props.caller.id
                }
            });
        }
    }

    sendAccessMessage(){
        this.props.actions.sendMessage({
            type: ACCEPT_CALL,
            params: {
                receiver: this.props.caller.id
            }
        });
    }

    //--------------------------------
    initWebRTC(){
        this.PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        this.IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
        this.SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
        navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    };

    static getUserMedia(successCallback, errorCallback){
        navigator.getUserMedia(
            {audio: true, video: true},
            successCallback,
            errorCallback
        );
    }

    createAnswer(offer){
        this.initWebRTC();
        IngoingCall.getUserMedia((stream) => {
            this.answerSuccessCallback(stream, offer);
        }, this.errorCallback);
    }

    answerSuccessCallback(stream, offer){
        //TODO: save local stream
        //this.localStream = stream;
        document.getElementById("local-video").src = URL.createObjectURL(stream);
        this.pc = new this.PeerConnection(this.PC_CONFIG);
        this.pc.addStream(stream);
        this.pc.onicecandidate = this.gotAnswerIceCandidate;
        this.pc.onaddstream = this.gotRemoteStream;

        this.pc.setRemoteDescription(new this.SessionDescription(offer));

        this.sendAnswer();
    }

    gotAnswerIceCandidate(event){
        if (event.candidate) {
            this.props.actions.sendMessage({
                jsonrpc: '2.0',
                method: 'ice',
                type: ICE,
                params: {
                    ice: event.candidate,
                    receiver: this.props.caller.id
                }
            });
        }
    }

    gotRemoteStream(event){
        //TODO set remote stream
        //this.remoteStream = event.stream;
        document.getElementById("remote-video").src = URL.createObjectURL(event.stream);
    }

    sendAnswer(){
        this.pc.createAnswer(
            this.gotAnswerLocalDescription,
            this.errorCallback,
            {'mandatory': { 'OfferToReceiveAudio': this.props.mediaAccess.audioAccess, 'OfferToReceiveVideo': this.props.mediaAccess.videoAccess }}
        );
    }

    gotAnswerLocalDescription(description){
        this.pc.setLocalDescription(description);
        this.props.actions.sendMessage({
            jsonrpc: '2.0',
            method: 'sdp',
            type: ANSWER,
            params: {
                answer: description,
                receiver: this.props.caller.id
            }
        });
    }

    onIce(ice){
        if(this.pc === null){
            this.ices.push(ice);
        }
        else {
            this.ices.forEach((el) => {
                this.pc.addIceCandidate(new this.IceCandidate(ice));
            });
            this.ices = [];
            this.pc.addIceCandidate(new this.IceCandidate(ice));
        }
    }

    errorCallback(error){
        console.log(error);
    }
    //--------------------------------

    render(){

        const caller = this.props.caller;

        return (
            <div className='ingoing-call'>
                <div className='move'>Ingoing call</div>
                <a href='javascript:void(0)' className='btn-close' onClick={ this.rejectCall }>
                    <i className='glyphicon glyphicon-remove'></i>
                </a>
                <div className='block'>
                    <div className='user'>{ caller.name }</div>
                    <div className='buttons'>
                        <a href='javascript:void(0)' className='btn-audio' onClick={ this.acceptAudioCall }>
                            <i className='glyphicon glyphicon-volume-down'></i>
                        </a>
                        <a href='javascript:void(0)' className='btn-video' onClick={ this.acceptCall }>
                            <i className='glyphicon glyphicon-facetime-video'></i>
                        </a>
                        <a href='javascript:void(0)' className='btn-reject' onClick={ this.rejectCall }>
                            <i className='glyphicon glyphicon-ban-circle'></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default IngoingCall;