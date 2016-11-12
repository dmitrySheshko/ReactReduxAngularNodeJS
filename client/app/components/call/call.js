import React from 'react';
import { connect } from 'react-redux';

import { endCall, removeRemoteCallUser } from '../../actions/call-actions';

import IngoingCall from './ingoing-call';
import OutgoingCall from './outgoing-call';
import VideoCall from './video';

class Call extends React.Component {
    render(){
        return(
            <div className='call-component'>
                { (this.props.call.outgoingCall) ? <OutgoingCall actions={ { endCall: this.props.endCall, removeRemoteCallUser: this.props.removeRemoteCallUser, sendMessage: this.props.sendMessage } } remoteUser={ this.props.call.remoteUser } ownerId={ this.props.ownerId } /> : null }
                { (this.props.call.ingoingCall) ? <IngoingCall /> : null }
                { (this.props.call.startCall) ? <VideoCall /> : null }
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

export default connect(mapStateToProps, { endCall, removeRemoteCallUser })(Call);