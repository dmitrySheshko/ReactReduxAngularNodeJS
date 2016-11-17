import React from 'react';

import { END_CALL, ICE, OFFER, LOCAL_STREAM, REMOTE_STREAM } from '../../../common/constants/const';

class OutgoingCall extends React.Component {

    constructor(props){
        super(props);

        this.PeerConnection = null;
        this.IceCandidate = null;
        this.SessionDescription = null;
        this.pc = null;
        this.PC_CONFIG = null;
        this.ices = [];

        this.endCall = this.endCall.bind(this);
        this.sendEndCall = this.sendEndCall.bind(this);
        this.initWebRTC = this.initWebRTC.bind(this);
        this.createOffer = this.createOffer.bind(this);
        this.offerSuccessCallback = this.offerSuccessCallback.bind(this);
        this.errorCallback = this.errorCallback.bind(this);
        this.gotOfferIceCandidate = this.gotOfferIceCandidate.bind(this);
        this.gotRemoteStream = this.gotRemoteStream.bind(this);
        this.sendOffer = this.sendOffer.bind(this);
        this.gotOfferLocalDescription = this.gotOfferLocalDescription.bind(this);
        this.onAnswer = this.onAnswer.bind(this);
        this.onIce = this.onIce.bind(this);
        this.setStream = this.setStream.bind(this);
    }

    componentWillMount(){
        this.props.actions.setCreateOffer(this.createOffer);
        this.props.actions.setOnAnswer(this.onAnswer);
        this.props.actions.setOnIce(this.onIce);
    }

    endCall(){
        this.props.actions.endCall();
        this.sendEndCall();
    }

    sendEndCall(){
        if(this.props.actions.sendMessage) {
            this.props.actions.sendMessage({
                type: END_CALL,
                params: {
                    receiver: this.props.receiver.id
                }
            });
        }
    }

    setStream(streamType, stream){
        this.props.actions.setStream(streamType, stream);
    }

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

    createOffer(){
        this.initWebRTC();
        OutgoingCall.getUserMedia(this.offerSuccessCallback, this.errorCallback);
    }

    offerSuccessCallback(stream){
        this.setStream(LOCAL_STREAM, stream);
        document.getElementById("local-video").src = URL.createObjectURL(stream);
        this.pc = new this.PeerConnection(this.PC_CONFIG);
        this.pc.addStream(stream);
        this.pc.onicecandidate = this.gotOfferIceCandidate;
        this.pc.onaddstream = this.gotRemoteStream;
        this.sendOffer();
    }

    gotOfferIceCandidate(event){
        if (event.candidate) {
            this.props.actions.sendMessage({
                jsonrpc: '2.0',
                method: 'ice',
                type: ICE,
                params: {
                    ice: event.candidate,
                    receiver: this.props.receiver.id
                }
            });
        }
    }

    gotRemoteStream(event){
        this.setStream(REMOTE_STREAM, event.stream);
        document.getElementById("remote-video").src = URL.createObjectURL(event.stream);
    }

    sendOffer(){
        this.pc.createOffer(
            this.gotOfferLocalDescription,
            this.errorCallback,
            {'mandatory': { 'OfferToReceiveAudio': this.props.mediaAccess.audioAccess, 'OfferToReceiveVideo': this.props.mediaAccess.videoAccess }}
        );
    }

    gotOfferLocalDescription(description){
        this.pc.setLocalDescription(description);
        this.props.actions.sendMessage({
            jsonrpc: '2.0',
            method: 'sdp',
            type: OFFER,
            params: {
                offer: description,
                receiver: this.props.receiver.id
            }
        });
    }

    onAnswer(answer){
        this.pc.setRemoteDescription(new this.SessionDescription(answer));
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

    render(){
        return (
            <div className='outgoing-call'>
                <div className='move'>Outgoing call</div>
                <a href='javascript:void(0)' className='btn-close' onClick={ this.endCall } >
                    <i className='glyphicon glyphicon-remove'></i>
                </a>
                <div className='block'>
                    <div className='user'>{ this.props.receiver.name }</div>
                    <div className='buttons'>
                        <a href='javascript:void(0)' className='btn-audio'>
                            <i className='glyphicon glyphicon-volume-down'></i>
                        </a>
                        <a href='javascript:void(0)' className='btn-video'>
                            <i className='glyphicon glyphicon-facetime-video'></i>
                        </a>
                        <a href='javascript:void(0)' className='btn-reject' onClick={ this.endCall }>
                            <i className='glyphicon glyphicon-ban-circle'></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default OutgoingCall;