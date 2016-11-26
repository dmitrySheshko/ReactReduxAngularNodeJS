import express from 'express';

import User from '../../models/user/user-mongoose-model';
import UserPublicModel from '../../models/user/user-public-model';

let router = express.Router();

router.get('/admin', (req, res) => {
    User.findOne({_id: req.session.user}, (err, user) => {
        if(err) return next(err);
        if(user && user.role === 'admin'){
            res.send(200, new UserPublicModel(user));
        }
        else {
            res.send(403);
        }
    });
});

router.get('/', (req, res) => {
    User.findOne({_id: req.session.user}, (err, user) => {
        if(err) return next(err);
        if(user){
            res.send(200, new UserPublicModel(user));
        }
        else {
            res.send(401);
        }
    });
});

export default router;