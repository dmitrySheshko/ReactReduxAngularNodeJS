import React from 'react';
import { connect } from 'react-redux';

import { endCall, changeVideoAccess, changeAudioAccess, acceptIngoingCall, setCreateOffer, setOnIce, setCreateAnswer, setOnAnswer, setStream } from '../../actions/call-actions';

import IngoingCall from './ingoing-call';
import OutgoingCall from './outgoing-call';
import VideoCall from './video';

class Call extends React.Component {

    constructor(props){
        super(props);
        this.checkUserMedia = this.checkUserMedia.bind(this);
    }

    componentWillMount(){
        this.checkUserMedia();
    }

    checkUserMedia(){
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            if(devices.length){
                var audio = null;
                var video = null;
                devices.forEach(function(device){
                    if(device.kind == "videoinput"){
                        video = true;
                    }
                    if(device.kind == "audioinput"){
                        audio = true;
                    }
                });
                this.props.changeVideoAccess(video);
                this.props.changeAudioAccess(audio);
            }
        });
    };

    render(){
        return(
            <div className='call-component'>
                { (this.props.call.outgoingCall) ? <OutgoingCall actions={ { endCall: this.props.endCall, sendMessage: this.props.sendMessage, setCreateOffer: this.props.setCreateOffer, setOnAnswer: this.props.setOnAnswer, setOnIce: this.props.setOnIce, setStream: this.props.setStream } } receiver={ this.props.call.receiver } ownerId={ this.props.ownerId } mediaAccess={ { videoAccess: this.props.call.videoAccess, audioAccess: this.props.call.audioAccess } } /> : null }
                { (this.props.call.ingoingCall) ? <IngoingCall actions={ { endCall: this.props.endCall, sendMessage: this.props.sendMessage, changeVideoAccess: this.props.changeVideoAccess, acceptIngoingCall: this.props.acceptIngoingCall, setCreateAnswer: this.props.setCreateAnswer, setOnIce: this.props.setOnIce, setStream: this.props.setStream } } caller={ this.props.call.caller } mediaAccess={ { videoAccess: this.props.call.videoAccess, audioAccess: this.props.call.audioAccess } } /> : null }
                { (this.props.call.startCall) ? <VideoCall actions={ { endCall: this.props.endCall, changeVideoAccess: this.props.changeVideoAccess, changeAudioAccess: this.props.changeAudioAccess } } mediaAccess={ { videoAccess: this.props.call.videoAccess, audioAccess: this.props.call.audioAccess } } /> : null }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        call: state.call,
        ownerId: state.owner.owner.id,
        sendMessage: state.owner.ws.sendMessage
    }
}

export default connect(mapStateToProps, { endCall, changeVideoAccess, changeAudioAccess, acceptIngoingCall, setCreateOffer, setOnIce, setCreateAnswer, setOnAnswer, setStream } )(Call);