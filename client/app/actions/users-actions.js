import axios from 'axios';
import { SET_USERS, SET_USERS_COUNT, ONLINE_STATUS } from '../../common/constants/const';

export function setUsers(users){
    return {
        type: SET_USERS,
        users
    }
}

export function setUsersCount(count){
    return {
        type: SET_USERS_COUNT,
        count
    }
}

export function usersChangeOnline(user){
    return {
        type: ONLINE_STATUS,
        user
    };
}

export function getUsers(page){
    return dispatch => {
        return axios.get('/api/users', { params: { page: page } }).then(res => {
            dispatch(setUsers(res.data.users));
            dispatch(setUsersCount(res.data.usersCount));
        });
    }
}
