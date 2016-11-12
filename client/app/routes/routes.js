import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Main from '../components/main/main';
import Home from '../components/home/home';
import Users from '../components/users/users';
import User from '../components/user/user';
import Office from '../components/office/office';
import OwnerData from '../components/office/owner-data/owner-data';
import OwnerMessages from '../components/office/owner-messages/owner-messages';

export default (
    <Router history={ browserHistory }>
        <Route path='/' component={ Main }>
            <IndexRoute component={ Home } />
            <Route path='users'>
                <IndexRoute component={ Users } />
                <Route path=':currentPage' component={ Users } />
            </Route>
            <Route path='user/:id' component={ User } />
            <Route path='office' component={ Office }>
                <IndexRoute component={ OwnerData } />
                <Route path='messages' component={ OwnerMessages }  />
            </Route>
        </Route>
    </Router>
);