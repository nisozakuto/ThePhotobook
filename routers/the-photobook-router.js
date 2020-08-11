const express = require('express');
const photobookRouter = express.Router();

const photobookController = require('../controllers/the-photobook-controller');

photobookRouter.get('/', photobookController.index);

module.exports = photobookRouter;