const User = require('../models/User-model')

const usersController = {
    new(req, res, next) {
        res.send('hello from photbook/new')
    },
    create(req, res, next) {
        res.send('hello from photbook/create')
    },
    indexPictures(req, res, next) {
        res.send('hello from photbook/index')
    }

}

module.exports = usersController