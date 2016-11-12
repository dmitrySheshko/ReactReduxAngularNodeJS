import React from 'react';
import { Link } from 'react-router';

class OfficeMenu extends React.Component {
    render(){
        return (
            <nav className="navbar navbar-default pull-left">
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/office">Data</Link>
                        </li>
                        <li>
                            <Link to="/office/messages">Messages</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default OfficeMenu;