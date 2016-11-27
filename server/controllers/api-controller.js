import express from 'express';

import authController from './auth/auth-controller';
import sessionController from './session/session-controller';
import usersController from './users/users-controller';
import adminController from './admin/admin-controller';

let router = express.Router();

router.use('/session', sessionController);
router.use('/auth', authController);
router.use('/users', usersController);
router.use('/admin', adminController);
router.use('/', (req, res) => {
    res.send(403);
});

export default router;