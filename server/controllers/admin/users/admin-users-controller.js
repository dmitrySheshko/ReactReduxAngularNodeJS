import express from 'express';

import User from '../../../models/user/user-mongoose-model';
import UserAdminModel from '../../../models/user/user-admin-model';

let router = express.Router();

router.get('/:id', (req, res, next) => {
    User.findOne({id: req.params.id}, (err, user) => {
        if (err) {
            return next(err);
        }
        if(user) {
            res.send(200, new UserAdminModel(user));
        }
        else {
            res.send(404);
        }
    });
});

router.put('/block', (req, res, next) => {
    let data = req.body.data;
    User.findOneAndUpdate({id: data.id}, {$set: {blocked: data.blocked}}, {new: true}, (err, user)=> {
        if(err) {
            return next();
        }
        res.send(200, new UserAdminModel(user));
    });
});

router.put('/', (req, res, next) => {
    let data = req.body.data;
    User.findOneAndUpdate({id: data.id}, {$set: {name: data.name, role: data.role, gender: data.gender, description: data.description}}, {new: true}, (err, user)=> {
        if(err) {
            return next();
        }
        res.send(200, new UserAdminModel(user));
    });
});

router.get('/', (req, res, next) => {
    let currentPage = req.query.page;
    User.count((err, count) => {
        if(err) return next(err);
        User.find({}, (err, users) => {
            if(err) return next(err);
            let usersList = getAdminUsers(users);
            res.send({
                usersCount: count,
                users: usersList,
                currentPage: currentPage
            });
        }).limit(10).skip( (currentPage * 10 - 10) );
    });
});

function getAdminUsers(users){
    return users.map(user => {
        return new UserAdminModel(user);
    });
}

export default router;