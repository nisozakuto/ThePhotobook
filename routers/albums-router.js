const express = require('express');
const albumRouter = express.Router();

const albumController = require('../controllers/albums-controller');
const photoHelper = require('../services/photo-helpers')

//Get all the albums
albumRouter.get('/', albumController.index);
//Create a new album
//How can I pass information to either of these functions?
albumRouter.post('/', photoHelper.getTheFirstPicture, albumController.create);
//Delete an album
albumRouter.delete('/:id([0-9]+)', albumController.delete);
//Show an album
albumRouter.get('/:id([0-9]+)', albumController.show);

module.exports = albumRouter;