const bcrypt = require('bcryptjs');

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

function loginRedirect(req, res, next) {
    if (req.user) return res.redirect('/users');
    return next();
}

function loginRequired(req, res, next) {
    if (!req.user) return res.redirect('auth/login');
    console.log(req.user.username)
    return next();
}

module.exports = {
    comparePass,
    loginRedirect,
    loginRequired,
}