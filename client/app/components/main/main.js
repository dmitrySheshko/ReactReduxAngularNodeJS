import React from 'react';
import { connect } from 'react-redux';

import Call from '../../components/call/call';
import MainMenu from '../../modules/menu/main-menu';
import Footer from '../../modules/footer/footer';

import { login, registration, logout, getSession } from '../../actions/owner-actions';

class Main extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.getSession();
    }

    render(){
        return (
            <div className='main-block'>
                <div className='page-wrapper'>
                    <MainMenu owner={ this.props.owner.owner } actions={ { login: this.props.login, registration: this.props.registration, logout: this.props.logout } } />
                    <div className='page'>{ this.props.children }</div>
                    <Call />
                    <div className='for-footer'></div>
                </div>
                <Footer />
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        owner: state.owner
    }
}

export default connect(mapStateToProps, { login, registration, logout, getSession })(Main);