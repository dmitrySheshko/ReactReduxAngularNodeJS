import express from 'express';

import adminUsersController from './users/admin-users-controller'

let router = express.Router();

router.use('/users', adminUsersController);
router.use('/', (req, res) => {
    res.send(403);
});

export default router;