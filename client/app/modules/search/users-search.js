import React from 'react';

class UsersSearch extends React.Component {
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
    }

    search(event){
        this.props.actions.search(event.target.value);
    }

    render(){
        return (
            <div>
                <form className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" onChange={ this.search } />
                    </div>
                </form>
            </div>
        );
    }
}

export default UsersSearch;