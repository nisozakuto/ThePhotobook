const User = require('../models/User-model')

const usersController = {
    async new(req, res, next) {
        const users = await User.getAll()
        res.json({ users })

    },
    create(req, res, next) {
        res.send('hello from photbook/create')
    },
    indexPictures(req, res, next) {
        res.send('hello from photbook/index')
    }

}

module.exports = usersController