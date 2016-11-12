import React from 'react';

class IngoingCall extends React.Component {
    render(){
        return (
            <div className='ingoing-call'>
                <div className='move'>Ingoing call</div>
                <a href='javascript:void(0)' className='btn-close'>
                    <i className='glyphicon glyphicon-remove'></i>
                </a>
                <div className='block'>
                    <div className='user'>Ingoing user name</div>
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
            </div>
        );
    }
}

export default IngoingCall;