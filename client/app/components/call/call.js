import React from 'react';
import { connect } from 'react-redux';

import { endCall } from '../../actions/call-actions';

import IngoingCall from './ingoing-call';
import OutgoingCall from './outgoing-call';
import VideoCall from './video';

class Call extends React.Component {
    render(){
        return(
            <div className='call-component'>
                { (this.props.call.outgoingCall) ? <OutgoingCall actions={ { endCall: this.props.endCall, sendMessage: this.props.sendMessage } } receiver={ this.props.call.receiver } ownerId={ this.props.ownerId } /> : null }
                { (this.props.call.ingoingCall) ? <IngoingCall actions={ { endCall: this.props.endCall, sendMessage: this.props.sendMessage } } caller={ this.props.call.caller } /> : null }
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

export default connect(mapStateToProps, { endCall })(Call);