import axios from 'axios';
import { SET_USER, ONLINE_STATUS } from '../../common/constants/const';

export function setUser(user){
    return {
        type: SET_USER,
        user
    }
}

export function userChangeOnline(user){
    return {
        type: ONLINE_STATUS,
        user
    }
}

export function getUser(id){
    return dispatch => {
        return axios.get('/api/users/' + id).then(response => {
            dispatch(setUser(response.data));
        });
    }
}