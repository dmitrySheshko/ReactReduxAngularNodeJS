import React from 'react';
import InputText from '../elements/input-text';

import AdvancedSearch from './advanced-search'

class UsersSearch extends React.Component {
    constructor(props){
        super(props);
        this.initState();
        this.search = this.search.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    initState(){
        this.state = {
            showModal: false,
            name: null
        };
    }

    show(){
        this.setState({showModal: true});
    }

    hide(){
        this.setState({showModal: false});
    }

    search(event){
        this.setState({name: event.target.value});
        this.props.actions.search(event.target.value);
    }

    render(){

        return (
            <form className="navbar-form">
                <InputText label="" labelClass="col-lg-4" name="name" type="text" onChange={ this.search } value={ this.state.name } elementWrapperClass="form-group" placeholder="Name" />
                <a href="javascript:void(0);" className="btn btn-info pull-right" onClick={ this.show }>Advanced search</a>
                <AdvancedSearch show={ this.state.showModal } actions={ { hide: this.hide, advancedSearch: this.props.actions.advancedSearch } } />
            </form>
        );
    }
}

export default UsersSearch;