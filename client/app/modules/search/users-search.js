import React from 'react';
import InputText from '../elements/input-text';
import InputRadio from '../elements/input-radio';

class UsersSearch extends React.Component {
    constructor(props){
        super(props);
        this.initState();
        this.search = this.search.bind(this);
        this.showHideAdvancedSearch = this.showHideAdvancedSearch.bind(this);
        this.getCheckedField = this.getCheckedField.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    initState(){
        this.state = {
            advanced: false,
            role: null,
            gender: null,
            status: null,
            name: ''
        };
    }

    setValue(event){
        let obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }

    getCheckedField(field){
        return this.state[field];
        this.props.actions.search('');
    }

    search(event){
        this.setValue(event);
        this.props.actions.search(event.target.value);
    }

    showHideAdvancedSearch(){
        this.setState({ advanced: !this.state.advanced });
    }

    render(){

        const search = (
            <form className="navbar-form navbar-left">
                <InputText label="Name" labelClass="col-lg-4" name="name" type="text" onChange={ this.search } value={ this.state.name } elementWrapperClass="form-group" placeholder="Name" />
                <a href="javascript:void(0);" className="btn btn-info" onClick={ this.showHideAdvancedSearch }>Advanced search</a>
            </form>
        );

        const advancedSearch = (
            <form className="navbar-form navbar-left">
                <InputText label="Name" labelClass="col-lg-4" name="name" type="text" onChange={ this.setValue } value={ this.state.name } elementWrapperClass="form-group" placeholder="Name" />
                <InputRadio label="Role" labelClass="col-lg-4" data={[{name:'user', label: 'User'}, {name:'admin', label: 'Admin'}]} name="role" onChange={this.setValue} checked={this.getCheckedField} elementWrapperClass="col-lg-8" />
                <InputRadio label="Gender" labelClass="col-lg-4" data={[{name:'male', label: 'Male'}, {name:'female', label: 'Female'}]} name="gender" onChange={this.setValue} checked={this.getCheckedField} elementWrapperClass="col-lg-8" />
                <InputRadio label="Status" labelClass="col-lg-4" data={[{name:'online', label: 'Online'}, {name:'offline', label: 'Offline'}]} name="status" onChange={this.setValue} checked={this.getCheckedField} elementWrapperClass="col-lg-8" />
                <a href="javascript:void(0);" className="btn btn-info" onClick={ this.showHideAdvancedSearch }>Simple search</a>
            </form>
        );

        return (
            <div>
                { this.state.advanced ? advancedSearch : search }
            </div>
        );
    }
}

export default UsersSearch;