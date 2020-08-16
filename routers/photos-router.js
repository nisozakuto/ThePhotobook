const express = require('express');
const photoRouter = express.Router();

const photoController = require('../controllers/photos-controller');
const photoHelpers = require('../services/photo-helpers')

photoRouter.get('/', photoController.index);

photoRouter.get('/new', (req, res) => {
    res.render('photobook/add');
});

photoRouter.get('/newphoto', photoHelpers.getAPicture, (req, res, next) => {
    console.log('asked for a new picture')
    res.render('myphoto', {
        photo: res.locals.photos,
        // medium: res.locals.photos.medium,
        // original: res.locals.photo.original
    })
})

photoRouter.post('/', photoController.create, (req, res) => {
    next();
});

photoRouter.get('/:id([0-9]+)', photoController.show, (req, res) => {
    res.render('photobook/show', {
        photo: res.locals.photo
    })
});
photoRouter.delete('/:id([0-9]+)', photoController.delete);


module.exports = photoRouter;