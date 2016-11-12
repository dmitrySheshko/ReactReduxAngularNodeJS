import axios from 'axios';
import { SET_OWNER, REMOVE_OWNER, CREATE_WS, REMOVE_WS, ONLINE_STATUS } from '../../common/constants/const';
import ws from '../modules/ws/ws';
import { usersChangeOnline } from './users-actions';

export function setOwner(owner){
    return {
        type: SET_OWNER,
        owner
    }
}

export function removeOwner(){
    return {
        type: REMOVE_OWNER
    }
}

export function createWS(ws){
    return {
        type: CREATE_WS,
        ws
    }
}

export function removeWS(){
    return {
        type: REMOVE_WS
    }
}

export function registration(data){
    return dispatch => {
        return axios.post('/api/auth/registration', data).then(response => {
            dispatch(setOwner(response.data));
            dispatch(createWS(new ws(dispatch)));
        });
    }
}

export function login(data){
    return dispatch => {
        return axios.post('/api/auth/login', data).then(response => {
            dispatch(setOwner(response.data));
            dispatch(createWS(new ws(dispatch)));
        });
    }
}

export function logout(userId){
    return dispatch => {
        return axios.post('/api/auth/logout').then(() => {
            dispatch(removeOwner());
            dispatch(removeWS());
            dispatch(usersChangeOnline({userId: userId, online: false}));
        }, (err) => {
            console.log('Logout error: ', err);
        });
    }
}

export function getSession(){
    return dispatch => {
        return axios.get('/api/session').then(response => {
            dispatch(setOwner(response.data));
            dispatch(createWS(new ws(dispatch)));
        }, err => {
            //console.log('Session error: ', err);
        });
    }
}

export function changeOwnerData(data){
    return dispatch => {
        return axios.put('/api/users', { data }).then(response => {
            dispatch(setOwner(response.data));
        })
    }
}