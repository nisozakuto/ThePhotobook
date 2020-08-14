const express = require('express');
const albumRouter = express.Router();

const albumController = require('../controllers/albums-controller');

//Get all the albums
albumRouter.get('/', albumController.index);

//Create a new album
albumRouter.post('/', albumController.create);

//Delete an album
albumRouter.delete('/:id([0-9]+)', albumController.delete);

//Show an album
albumRouter.get('/:id([0-9]+)', albumController.show);


// app.use('/photos', photosRouter);
module.exports = albumRouter;