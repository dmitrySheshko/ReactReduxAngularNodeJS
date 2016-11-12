import express from 'express';

import User from '../../models/user/user-mongoose-model';
import UserPublicModel from '../../models/user/user-public-model';

import WsModule from '../../modules/ws/ws-module';

let router = express.Router();

router.get('/:id', (req, res, next) => {
    User.findOne({id: req.params.id}, (err, user) => {
        if (err) next(err);
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
        if(err) next();
        res.send(200, new UserPublicModel(user));
    });
});

router.get('/', (req, res, next) => {
    let currentPage = req.query.page;
    User.count((err, count) => {
        if(err) next(err);
        User.find({}, (err, users) => {
            if(err) next(err);
            let usersList = getUsers(users);
            res.send({
                usersCount: count,
                users: usersList,
                currentPage: currentPage
            });
        }).limit(10).skip( (currentPage * 10 - 10) );
    });
});

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