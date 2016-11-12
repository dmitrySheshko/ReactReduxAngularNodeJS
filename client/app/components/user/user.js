import React from 'react';
import { connect } from 'react-redux';
import { Table, Modal } from 'react-bootstrap';
import { isEmpty } from 'lodash';

import { getUser } from '../../actions/user-actions';
import { startCall, setRemoteCallUser } from '../../actions/call-actions';

import { START_CALL } from '../../../common/constants/const';

class User extends React.Component {

    constructor(props){
        super(props);
        this.initState();
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.call = this.call.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.checkRegistration = this.checkRegistration.bind(this);
        this.checkOnline = this.checkOnline.bind(this);
        this.sendStartCall = this.sendStartCall.bind(this);
    }

    initState(){
        this.state = {
            showModal: false,
            errorMessage: ''
        };
    }

    componentWillMount(){
        let id = this.props.params.id;
        this.props.getUser(id);
    }

    show(){
        this.setState({showModal: true});
    }

    hide(){
        this.setState({showModal: false, errorMessage: ''});
    }

    call(){
        if(this.checkRegistration() && this.checkOnline()){
            this.props.setRemoteCallUser(this.props.user);
            this.props.startCall();
            this.sendStartCall();
        }
    }

    sendStartCall(){
        if(this.props.sendMessage) {
            this.props.sendMessage({
                type: START_CALL,
                params: {
                    ingoingUser: {
                        id: this.props.owner.id,
                        name: this.props.owner.name
                    }
                }
            });
        }
    }

    checkRegistration(){
        if(!this.props.owner.id){
            this.setState({errorMessage: 'You must registration first!'});
            this.show();
            return false;
        }
        return true;
    }

    checkOnline(){
        if(!this.props.user.online){
            this.setState({errorMessage: 'User is offline!'});
            this.show();
            return false;
        }
        return true;
    }

    sendMessage(){
        if(!this.props.owner.id){
            this.show();
        }
        else {
            //this.props.sendMessage();
        }
    }

    render(){
        const user = this.props.user;

        const userNotFound = (
            <div>
                User not found!
            </div>
        );

        const offline = (
            <span className="label label-default">offline</span>
        );

        const online = (
            <span className="label label-success">online</span>
        );

        const userInfo = (
            <Table striped bordered condensed hover>
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{ user.name }</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>{ user.role }</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{ user.gender }</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{ user.description }</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{ (user.online) ? online : offline }</td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <a href="javascript:void(0)" onClick={this.call}>Call</a>
                            <a href="javascript:void(0)" onClick={this.sendMessage}>Send Message</a>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );

        return (
            <div className='user-page'>
                { isEmpty(user) ? userNotFound : userInfo }

                <Modal className="static-modal" show={ this.state.showModal } onHide={this.hide}>
                    <Modal.Header>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.state.errorMessage }
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="javascript:void(0);" className="btn btn-default" onClick={this.hide}>Close</a>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user.user,
        owner: state.owner.owner,
        sendMessage: state.owner.ws.sendMessage
    }
}

export default connect(mapStateToProps, { getUser, startCall, setRemoteCallUser })(User);