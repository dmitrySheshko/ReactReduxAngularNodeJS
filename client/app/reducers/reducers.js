import { combineReducers } from 'redux';
import users from './users';
import user from './user';
import owner from './owner';
import call from './call';

export default combineReducers({
    users,
    user,
    owner,
    call
});