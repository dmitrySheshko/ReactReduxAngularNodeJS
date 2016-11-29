import React from 'react';
import { connect } from 'react-redux';
import { Table, Pagination } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

import { getUsers } from '../../actions/users-actions';
import { USERS_ON_PAGE } from '../../../common/constants/const';

import UsersSearch from '../../modules/search/users-search'


class Users extends React.Component {

    constructor(props){
        super(props);
        this.initState();

        this.handleSelect = this.handleSelect.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.search = this.search.bind(this);
        this.clearAdvancedSearchData = this.clearAdvancedSearchData.bind(this);
        this.advancedSearch = this.advancedSearch.bind(this);
    }

    componentWillMount(){
        this.setCurrentPage(this.getCurrentPage());
    }

    initState(){
        this.state = {
            currentPage: 1,
            pageCount: 0,
            users: [],
            advancedSearchData: {}
        };
    }

    getCurrentPage(){
        return parseInt(this.props.params.currentPage);
    }

    setCurrentPage(page){
        if(!page){
            page = 1;
        }
        this.setState({currentPage: page}, this.getUsers);
    }

    getUsers(){
        let searchObj = this.state.advancedSearchData;
        searchObj.page = this.state.currentPage;
        this.props.getUsers(searchObj).then(() => {
            this.setState({users: this.props.users.users});
        });
        if(this.state.currentPage === 1){
            browserHistory.push('/users');
        }
        else {
            browserHistory.push('/users/' + this.state.currentPage);
        }
    }

    handleSelect(key){
        this.setState({currentPage: key}, () => {
            this.getUsers();
        });
    }

    getPaginationItems(){
        return Math.ceil(this.props.users.usersCount / USERS_ON_PAGE );
    }

    search(query){
        let users = this.props.users.users.filter(user => {
            return ~user.name.toUpperCase().indexOf(query.toUpperCase());
        });

        this.setState({users: users});
    }

    advancedSearch(obj){
        this.setState({ advancedSearchData: obj }, this.getUsers);
    }

    clearAdvancedSearchData(){
        this.setState({ advancedSearchData: {} });
    }

    render(){

        const users = this.state.users;

        const pagination = (
            <Pagination
                bsSize="small"
                items={ this.getPaginationItems() }
                activePage={ this.state.currentPage }
                onSelect={ this.handleSelect } />
        );

        const offline = (
            <span className="label label-default">offline</span>
        );

        const online = (
            <span className="label label-success">online</span>
        );

        return (
            <div className='users-page'>
                <UsersSearch actions={ { search: this.search, advancedSearch: this.advancedSearch } } />
                <div className='users-table'>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Gender</th>
                            <th>status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user, k) => {
                                return <tr key={ k } className={ (this.props.ownerId === user.id) ? 'owner-row' : '' }>
                                    <td>{ k + 1 + (this.state.currentPage * USERS_ON_PAGE - USERS_ON_PAGE) }</td>
                                    <td>
                                        <Link to={ '/user/' + user.id }>{ user.name }</Link>
                                    </td>
                                    <td>{ user.role }</td>
                                    <td>{ user.gender }</td>
                                    <td>
                                        { (user.online) ? online : offline }
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </Table>
                </div>
                <div className='users-pagination'>
                    { (this.props.users.usersCount > USERS_ON_PAGE) ? pagination : null }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        ownerId: state.owner.owner.id
    };
}

export default connect(mapStateToProps, { getUsers })(Users);