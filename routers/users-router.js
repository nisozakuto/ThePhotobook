const userRouter = require('express').Router();
const userController = require('../controllers/user-controller');

userRouter.get('/new', userController.new);
userRouter.post('/', userController.create);
userRouter.get('/:id/pictures', userController.indexPictures)

module.exports = userRouter

