import React from 'react';

class VideoCall extends React.Component {
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
                    <a href='javascript:void(0)' className='btn-audio'>
                        <i className='glyphicon glyphicon-volume-down'></i>
                    </a>
                    <a href='javascript:void(0)' className='btn-video'>
                        <i className='glyphicon glyphicon-facetime-video'></i>
                    </a>
                    <a href='javascript:void(0)' className='btn-reject'>
                        <i className='glyphicon glyphicon-ban-circle'></i>
                    </a>
                </div>
            </div>
        );
    }
}

export default VideoCall;