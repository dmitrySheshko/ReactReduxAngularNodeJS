import React from 'react';
import { Link } from 'react-router';
import { isEmpty } from 'lodash';

import Login from '../auth/login';
import Registration from '../auth/registration';

class MainMenu extends React.Component {

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.props.actions.logout(this.props.owner.id);
    }

    static goToAdminPanel(){
        window.location.href = '/admin';
    }

    render(){
        const userLinks = (
            <ul className="nav navbar-nav pull-right">
                <li><Link to="/office">{ (this.props.owner) ? this.props.owner.name : '' }</Link></li>
                <li><a href="javascript:void(0);" onClick={ this.logout }>Logout</a></li>
                <li>{ (this.props.owner.role === 'admin') ? <a href='javascript:void(0)' onClick={ MainMenu.goToAdminPanel }>Admin Panel</a> : '' }</li>
            </ul>
        );

        const guestLinks= (
            <ul className="nav navbar-nav pull-right">
                <Registration registration={ this.props.actions.registration } />
                <Login login={ this.props.actions.login } />
            </ul>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><Link to="/" activeClassName="active">Home</Link></li>
                        <li><Link to="/users" activeClassName="active">Users</Link></li>
                    </ul>
                    { (isEmpty(this.props.owner)) ? guestLinks : userLinks }
                </div>
            </nav>
        );
    }
}

export default MainMenu;