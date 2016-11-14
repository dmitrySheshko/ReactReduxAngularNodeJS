import React from 'react';

import { END_CALL } from '../../../common/constants/const';

class OutgoingCall extends React.Component {

    constructor(props){
        super(props);
        this.endCall = this.endCall.bind(this);
        this.sendEndCall = this.sendEndCall.bind(this);
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