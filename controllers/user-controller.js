const bcrypt = require('bcryptjs');
const User = require('../models/User-model')

const usersController = {
    async new(req, res, next) {
        // const users = await User.getAll()
        // res.json({ users })
        res.render('users/register', {})
    },

    create(req, res, next) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            // email: req.body.email,
            password_digest: hash

        }).save()
            .then(user => {
                req.login(user, (err) => {
                    if (err) return next(err);
                    res.redirect('/users');
                })
            }).catch(next);
    },
    index(req, res, next) {
        // res.send('hello from photbook/index')
        res.json({
            message: "ok working",
            data:
            {
                user: req.user,
            }
        })
    }
}

module.exports = usersController