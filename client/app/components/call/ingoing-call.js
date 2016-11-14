import React from 'react';

import { REJECT_CALL, ACCEPT_CALL } from '../../../common/constants/const';

class IngoingCall extends React.Component {

    constructor(props){
        super(props);
        this.rejectCall = this.rejectCall.bind(this);
        this.acceptCall = this.acceptCall.bind(this);
        this.acceptAudioCall = this.acceptAudioCall.bind(this);
        this.sendRejectMessage = this.sendRejectMessage.bind(this);
        this.sendAccessMessage = this.sendAccessMessage.bind(this);
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
        this.props.actions.startCall();
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