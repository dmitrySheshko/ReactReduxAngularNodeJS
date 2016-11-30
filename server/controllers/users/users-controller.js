import express from 'express';
import isEmpty from 'lodash/isEmpty';

import User from '../../models/user/user-mongoose-model';
import UserPublicModel from '../../models/user/user-public-model';

import WsModule from '../../modules/ws/ws-module';

let router = express.Router();

router.get('/:id', (req, res, next) => {
    User.findOne({id: req.params.id}, (err, user) => {
        if (err) return next(err);
        const onlineUsers = WsModule.users;
        user.online = onlineUsers.some(itemUser => {
            return itemUser.id === user.id;
        });
        res.send(200, new UserPublicModel(user));
    });
});

router.put('/', (req, res, next) => {
    let data = req.body.data;
    User.findByIdAndUpdate({_id: req.session.user}, {$set: {name: data.name, role: data.role, gender: data.gender, description: data.description}}, {new: true}, (err, user)=> {
        if(err) return next();
        res.send(200, new UserPublicModel(user));
    });
});

router.get('/', (req, res, next) => {
    let searchData = req.query;
    let searchObj = getQueryObject(searchData);
    if(isEmpty(searchObj)){
        getUserList(res, next, searchData.page);
    }
    else {
        getAdvancedUserList(res, next, searchObj, searchData.page);
    }
});

function getUserList(res, next, page){
    User.count((err, count) => {
        if(err) return next(err);
        findUsers(res, next, {}, page, count);
    });
}

function getAdvancedUserList(res, next, searchObj, page){
    User.find(searchObj).count((err, count) => {
        if(err) return next(err);
        findUsers(res, next, searchObj, page, count);
    });
}

function findUsers(res, next, searchObj, page, count){
    User.find(searchObj, (err, users) => {
        if(err) return next(err);
        let usersList = getUsers(users);
        res.send({
            usersCount: count,
            users: usersList,
            currentPage: page
        });
    }).limit(10).skip(page * 10 - 10);
}

function getQueryObject(searchData){
    let obj = {};
    searchData.name ? obj.name = new RegExp(searchData.name) : null;
    searchData.gender ? obj.gender = searchData.gender : null;
    searchData.role ? obj.role = searchData.role : null;
    return obj;
}

function getUsers(users){
    let onlineUsers = WsModule.users;
    return users.map(user => {
        user.online = onlineUsers.some(el => {
            return el.id === user.id;
        });
        return new UserPublicModel(user);
    });
}

export default router;