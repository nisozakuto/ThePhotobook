const userRouter = require('express').Router();
const userController = require('../controllers/user-controller');
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/user-controller');

userRouter.get('/', authHelpers.loginRequired, usersController.index)
userRouter.post('/', userController.create)
userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/register');
});

module.exports = userRouter

