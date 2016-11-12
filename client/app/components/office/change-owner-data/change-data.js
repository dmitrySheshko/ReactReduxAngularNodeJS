import React from 'react';
import { Modal } from 'react-bootstrap';

import InputText from '../../../modules/elements/input-text';
import InputRadio from '../../../modules/elements/input-radio';
import Textarea from '../../../modules/elements/textarea';

class OfficeChange extends React.Component {

    constructor(props){
        super(props);
        this.initState();
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.getCheckedField = this.getCheckedField.bind(this);
        this.setValue = this.setValue.bind(this);
        this.change = this.change.bind(this);
        this.setOwner = this.setOwner.bind(this);
    }

    initState(){
        this.state = {
            showModal: false,
            errors: {},
            isLoading: false,
            owner: {
                name: '',
                role: '',
                gender: '',
                description: ''
            }
        };
    }

    componentWillMount(){
        this.setOwner();
    }

    setOwner(){
        var temp = {};
        for(let key in this.state.owner){
            temp[key] = this.props.owner[key];
        }
        this.setState({owner: temp});
    }

    show(){
        this.setState({showModal: true});
    }

    hide(){
        this.setState({showModal: false});
        this.setOwner();
    }

    setValue(e){
        const owner = this.state.owner;
        owner[e.target.name] = e.target.value;
        this.setState({owner: owner});
    }

    getCheckedField(field){
        return this.state.owner[field];
    }

    change(){
        this.props.actions.change(this.state.owner);
    }

    render(){
        const owner = this.props.owner;
        return(
            <div>
                <a href="javascript:void(0);" onClick={ this.show }>Change</a>
                <Modal className="static-modal" show={this.state.showModal} onHide={this.hide}>
                    <Modal.Header>
                        <Modal.Title>Change data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-horizontal">
                            <InputText label="Name" labelClass="col-lg-4" name="name" type="text" onChange={ this.setValue } value={ this.state.owner.name } elementWrapperClass="col-lg-8" error={this.state.errors.name} />
                            <InputRadio label="Role" labelClass="col-lg-4" data={[{name:'user', label: 'User'}, {name:'admin', label: 'Admin'}]} name="role" onChange={this.setValue} checked={this.getCheckedField} elementWrapperClass="col-lg-8" />
                            <InputRadio label="Gender" labelClass="col-lg-4" data={[{name:'male', label: 'Male'}, {name:'female', label: 'Female'}]} name="gender" onChange={this.setValue} checked={this.getCheckedField} elementWrapperClass="col-lg-8" />
                            <Textarea label="Description" labelClass="col-lg-4" name='description' onChange={ this.setValue } elementWrapperClass="col-lg-8" value={ this.state.owner.description } />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="javascript:void(0);" className="btn btn-default" onClick={this.hide}>Close</a>
                        <a href="javascript:void(0);" className="btn btn-success" disabled={this.isLoading} onClick={this.change}>Change</a>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default OfficeChange;