import React from 'react';
import { Modal } from 'react-bootstrap';

import validation from '../../../common/validations/login';

import InputText from '../elements/input-text';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.initState();
        this.hide = this.hide.bind(this);
        this.setValue = this.setValue.bind(this);
        this.login = this.login.bind(this);
        this.show = this.show.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    initState(){
        this.state = {
            user: {
                login: '',
                password: ''
            },
            showModal: false,
            errors: {},
            isLoading: false
        };
    }

    setValue(e){
        const user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({user: user});
    }

    show(){
        this.setState({showModal: true});
    }

    hide(){
        this.setState({showModal: false, user: {login: '', password: ''}});
    }

    isValid() {
        const { errors, isValid } = validation(this.state.user);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    login(){
        if(this.isValid()) {
            this.props.login(this.state.user).then(() => {

            }, () => {
                this.setState({isLoading: false});
            });
        }
    }

    render(){
        return(
            <li>
                <a href="javascript:void(0)" onClick={this.show}>Login</a>
                <Modal className="static-modal" show={this.state.showModal} onHide={this.hide}>
                    <Modal.Header>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-horizontal">
                            <InputText label="Login" labelClass="col-lg-4" name="login" onChange={ this.setValue } value={ this.state.user.login } elementWrapperClass="col-lg-8" error={this.state.errors.login} />
                            <InputText label="Password" labelClass="col-lg-4" name="password" type="password" onChange={ this.setValue } value={ this.state.user.password } elementWrapperClass="col-lg-8" error={this.state.errors.password} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="javascript:void(0);" className="btn btn-default" onClick={this.hide}>Close</a>
                        <a href="javascript:void(0);" className="btn btn-success" disabled={this.isLoading} onClick={this.login}>Login</a>
                    </Modal.Footer>
                </Modal>
            </li>
        );
    }
}

export default Login;