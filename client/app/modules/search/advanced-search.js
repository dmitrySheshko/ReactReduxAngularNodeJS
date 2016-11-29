import React from 'react';
import { Modal } from 'react-bootstrap';

import InputText from '../elements/input-text';
import InputRadio from '../elements/input-radio';

class AdvancedSearch extends React.Component {

    constructor(props){
        super(props);
        this.initState();
        this.setValue = this.setValue.bind(this);
        this.getCheckedField = this.getCheckedField.bind(this);
        this.hide = this.hide.bind(this);
        this.search = this.search.bind(this);
    }

    initState(){
        this.state = {
            role: null,
            gender: null,
            status: null,
            name: null
        };
    }

    hide(){
        this.props.actions.hide();
        this.setState(
            {
                role: null,
                gender: null,
                status: null,
                name: null
            });
    }

    setValue(e){
        const obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
    }

    getCheckedField(field){
        return this.state[field];
    }

    search(){
        this.props.actions.advancedSearch(this.state);
        this.hide();
    }

    render(){
        return(
            <Modal className="static-modal" show={this.props.show} onHide={this.hide}>
                <Modal.Header>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <InputText label="Name" labelClass="col-lg-4" name="name" type="text" onChange={ this.setValue } value={ this.state.name } elementWrapperClass="col-lg-8" placeholder="Name" />
                        <InputRadio label="Role" labelClass="col-lg-4" data={[{name:'user', label: 'User'}, {name:'admin', label: 'Admin'}]} name="role" onChange={this.setValue} checked={this.getCheckedField} elementWrapperClass="col-lg-8" />
                        <InputRadio label="Gender" labelClass="col-lg-4" data={[{name:'male', label: 'Male'}, {name:'female', label: 'Female'}]} name="gender" onChange={this.setValue} checked={this.getCheckedField} elementWrapperClass="col-lg-8" />
                        <InputRadio label="Status" labelClass="col-lg-4" data={[{name:'online', label: 'Online'}, {name:'offline', label: 'Offline'}]} name="status" onChange={this.setValue} checked={this.getCheckedField} elementWrapperClass="col-lg-8" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <a href="javascript:void(0);" className="btn btn-success" disabled={this.isLoading} onClick={this.search}>Search</a>
                    <a href="javascript:void(0);" className="btn btn-default" onClick={this.hide}>Close</a>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default AdvancedSearch;