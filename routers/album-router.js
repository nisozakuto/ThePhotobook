const express = require('express');
const albumRouter = express.Router();

const AlbumController = require('../controllers/albums_controller');
///Helper is not necessary here I think

//Get all the albums
albumRouter.get('/', AlbumController.index);

//Create a new album
albumRouter.post('/', AlbumController.create);

//Delete an album
albumRouter.delete('/:id([0-9]+)', AlbumController.delete);

//Show an album
albumRouter.get('/:id([0-9]+)', AlbumController.show, (req, res) => {
    res.render('/pictures', {
        data: {
            //What goes here?
        }
    })
});

module.exports = albumRouter;