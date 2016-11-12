import express from 'express';

import User from '../../models/user/user-mongoose-model';
import UserPublicModel from '../../models/user/user-public-model';

let router = express.Router();

router.post('/registration', (req, res) => {
    User.findOne({login: req.body.login}, function(err, user){
        if(err) return next(err);
        if(user){
            res.send(409, {error: 'User exists'});
        }
        else {
            let user = new User({
                login: req.body.login,
                password: req.body.password,
                name: req.body.name,
                role: req.body.role,
                gender: req.body.gender,
                description: req.body.description
            });

            user.save(function(err, user, affected){
                if(err) return next(err);
                req.session.user = user._id;
                res.send(200, new UserPublicModel(user));
            });
        }
    });
});

router.post('/login', (req, res) => {
    User.findOne({login: req.body.login}, (err, user) => {
        if(err) res.send(404);
        if(user){
            if(user.password === req.body.password){
                req.session.user = user._id;
                res.send(200, new UserPublicModel(user));
            }
            else {
                res.send(400, {error: 'Bad credentials'});
            }
        }
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send(200);
});

router.use('/', (req, res) => {
    res.send(403);
});

export default router;