import React from 'react';
import classnames from 'classnames';

class VideoCall extends React.Component {

    constructor(props){
        super(props);
        this.endCall = this.endCall.bind(this);
        this.changeVideoAccess = this.changeVideoAccess.bind(this);
        this.changeAudioAccess = this.changeAudioAccess.bind(this);
    }

    endCall(){
        this.props.actions.endCall();
    }

    changeVideoAccess(){
        this.props.actions.changeVideoAccess();
    }

    changeAudioAccess(){
        this.props.actions.changeAudioAccess();
    }

    render(){
        return (
            <div className='video-call'>
                <div className='move'></div>
                <div className='video-clock'>
                    <div className='remote-video'>
                        <video id='remote-video' src="" muted autoPlay></video>
                    </div>
                    <div className='local-video'>
                        <video id='local-video' src="" autoPlay></video>
                    </div>
                </div>
                <div className='buttons'>
                    <a href='javascript:void(0)' className={ classnames('btn-audio', {'disabled': !this.props.mediaAccess.audioAccess}) } onClick={ this.changeAudioAccess }>
                        <i className='glyphicon glyphicon-volume-down'></i>
                    </a>
                    <a href='javascript:void(0)' className={ classnames('btn-video', {'disabled': !this.props.mediaAccess.videoAccess}) } onClick={ this.changeVideoAccess }>
                        <i className='glyphicon glyphicon-facetime-video'></i>
                    </a>
                    <a href='javascript:void(0)' className='btn-reject' onClick={ this.endCall }>
                        <i className='glyphicon glyphicon-ban-circle'></i>
                    </a>
                </div>
            </div>
        );
    }
}

export default VideoCall;