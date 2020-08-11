const User = require('../models/User-model')

const usersController = {
    async new(req, res, next) {
        // const users = await User.getAll()
        // res.json({ users })
        res.render('users/register', {})
    },
    create(req, res, next) {
        console.log(req.body)
        res.send("you did it");
        // res.send('hello from photbook/create')
    },
    indexPictures(req, res, next) {
        res.send('hello from photbook/index')
    }

}

module.exports = usersController