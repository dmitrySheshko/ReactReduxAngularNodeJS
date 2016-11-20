import express from 'express';

import User from '../../models/user/user-mongoose-model';

let router = express.Router();

export default function checkSession (req, res, next){
    User.findOne({_id: req.session.user}, (err, user) => {
        if(err) {
            res.status(401);
            return next(err);
        }
        if(!user){
            res.status(401);
            next();
        }
    });
}