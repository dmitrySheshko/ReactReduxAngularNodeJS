import React from 'react';
import InputText from '../elements/input-text';
import isEmpty from 'lodash/isEmpty';

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
            showModal: false
        };
    }

    show(){
        this.props.actions.setQuery('');
        this.props.actions.search('');
        this.setState({ showModal: true });
    }

    hide(){
        this.setState({ showModal: false });
    }

    search(event){
        this.props.actions.setQuery(event.target.value);
        this.props.actions.search(event.target.value);
    }

    render(){
        const advancedSearch = (
            <div className="advanced-search-info">
                { this.props.advancedSearch.name ? <div className="name"><strong>Name:</strong> { this.props.advancedSearch.name }</div> : null }
                { this.props.advancedSearch.role ? <div className="role"><strong>Role:</strong> { this.props.advancedSearch.role }</div> : null }
                { this.props.advancedSearch.gender ? <div className="role"><strong>Gender:</strong> { this.props.advancedSearch.gender }</div> : null }
                <div>
                    <a href="javascript:void(0);" className="btn btn-success" onClick={ this.props.actions.clearAdvancedSearch } >Clear</a>
                </div>
            </div>
        );
        return (
            <div>
                <form className="navbar-form">
                    <InputText
                        label=""
                        labelClass="col-lg-4"
                        name="name"
                        type="text"
                        onChange={ this.search }
                        value={ this.props.query }
                        elementWrapperClass="form-group"
                        placeholder="Name" />
                    <a href="javascript:void(0);" className="btn btn-info pull-right" onClick={ this.show }>Advanced search</a>
                    <AdvancedSearch show={ this.state.showModal } actions={ { hide: this.hide, advancedSearch: this.props.actions.advancedSearch } } />
                    { isEmpty(this.props.advancedSearch) ? null : advancedSearch }
                </form>
            </div>
        );
    }
}

export default UsersSearch;