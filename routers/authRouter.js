const authRouter = require('express').Router();
const passport = require('../services/auth/local')
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/user-controller');


// authRouter.get('/', authHelpers.loginRequired, usersController.index)
authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/login');
})

authRouter.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })
);

authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('back');
})

module.exports = authRouter; 