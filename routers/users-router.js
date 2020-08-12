const userRouter = require('express').Router();
const usersController = require('../controllers/user-controller');
const authHelpers = require('../services/auth/auth-helpers');

userRouter.get('/', authHelpers.loginRequired, usersController.index)
userRouter.post('/', usersController.create)
userRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/register');
});

module.exports = userRouter