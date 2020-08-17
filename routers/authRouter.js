const authRouter = require('express').Router();
const passport = require('../services/auth/local')
const authHelpers = require('../services/auth/auth-helpers');
const usersController = require('../controllers/user-controller');

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
    console.log(req.user),
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
    // res.redirect('back');
    res.redirect('/')
})

module.exports = authRouter; 