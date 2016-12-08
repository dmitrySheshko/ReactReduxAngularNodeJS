import React from 'react';
import { Modal } from 'react-bootstrap';
import validation from '../../../common/validations/registration';

import InputText from '../elements/input-text';
import InputRadio from '../elements/input-radio';
import Textarea from '../elements/textarea';

class Registration extends React.Component {
    constructor(props){
        super(props);
        this.initState();
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.setValue = this.setValue.bind(this);
        this.getCheckedField = this.getCheckedField.bind(this);
        this.isValid = this.isValid.bind(this);
        this.registration = this.registration.bind(this);
    }

    initState(){
        this.state = {
            user: {
                login: '',
                password: '',
                passwordConfirmation: '',
                name: '',
                role: 'user',
                description: '',
                gender: 'male'
            },
            showModal: false,
            errors: {},
            isLoading: false
        };
    }

    show(){
        this.setState({showModal: true});
    }

    hide(){
        this.setState(
            {
                showModal: false,
                user: {
                    login: '',
                    password: '',
                    passwordConfirmation: '',
                    name: '',
                    role: 'user',
                    description: '',
                    gender: 'male'
                }
            });
    }

    setValue(e){
        const user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({user: user});
    }

    getCheckedField(field){
        return this.state.user[field];
    }

    registration(){
        if(this.isValid()){
            this.setState({ errors: {}, isLoading: true });
            this.props.registration(this.state.user).then((resp) => {
                console.log(resp);
            }, (err) => {
                console.log(err);
            });
        }
    }

    isValid() {
        const { errors, isValid } = validation(this.state.user);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    render(){
        return(
            <li>
                <a href="javascript:void(0)" onClick={this.show}>Registration</a>
                <Modal className="static-modal" show={this.state.showModal} onHide={this.hide}>
                    <Modal.Header>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-horizontal">
                            <InputText
                                label="Name"
                                labelClass="col-lg-4"
                                name="name"
                                type="text"
                                onChange={ this.setValue }
                                value={ this.state.user.name }
                                elementWrapperClass="col-lg-8"
                                error={this.state.errors.name} />
                            <InputText
                                label="Login"
                                labelClass="col-lg-4"
                                name="login"
                                type="text"
                                onChange={ this.setValue }
                                value={ this.state.user.login }
                                elementWrapperClass="col-lg-8"
                                error={this.state.errors.login} />
                            <InputText
                                label="Password"
                                labelClass="col-lg-4"
                                name="password"
                                type="password"
                                onChange={ this.setValue }
                                value={ this.state.user.password }
                                elementWrapperClass="col-lg-8"
                                error={this.state.errors.password} />
                            <InputText
                                label="Password confirmation"
                                labelClass="col-lg-4"
                                name="passwordConfirmation"
                                type="password"
                                onChange={ this.setValue }
                                value={ this.state.user.passwordConfirmation }
                                elementWrapperClass="col-lg-8"
                                error={this.state.errors.passwordConfirmation} />
                            <InputRadio
                                label="Role"
                                labelClass="col-lg-4"
                                data={[{name:'user', label: 'User'}, {name:'admin', label: 'Admin'}]}
                                name="role"
                                onChange={this.setValue}
                                checked={this.getCheckedField}
                                elementWrapperClass="col-lg-8" />
                            <InputRadio
                                label="Gender"
                                labelClass="col-lg-4"
                                data={[{name:'male', label: 'Male'}, {name:'female', label: 'Female'}]}
                                name="gender"
                                onChange={this.setValue}
                                checked={this.getCheckedField}
                                elementWrapperClass="col-lg-8" />
                            <Textarea
                                label="Description"
                                labelClass="col-lg-4"
                                name='description'
                                onChange={ this.setValue }
                                elementWrapperClass="col-lg-8"
                                value={ this.state.user.description } />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="javascript:void(0);" className="btn btn-success" disabled={this.isLoading} onClick={this.registration}>Registration</a>
                        <a href="javascript:void(0);" className="btn btn-default" onClick={this.hide}>Close</a>
                    </Modal.Footer>
                </Modal>
            </li>
        );
    }
}

export default Registration;