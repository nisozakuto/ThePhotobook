const express = require('express');
const photoRouter = express.Router();

const photoController = require('../controllers/photos-controller');
const photoHelpers = require('../services/photo-helpers')

photoRouter.get('/', photoController.index);

photoRouter.get('/newphoto', photoHelpers.getAPicture, photoController.create, (req, res, next) => {
    // console.log(res)
    console.log('asked for a new picture')
    // res.render('/', {
    //     photo: res.locals.photo
    // })
    // res.redirect('back');
    res.render('myphoto', {
        photo: res.locals.photo
    })
    next();
})
photoRouter.post('/', photoController.create, (req, res) => {
    // res.render('/', {
    //     photo: res.locals.photo
    // })
});
photoRouter.get('/:id([0-9]+)', photoController.show, (req, res) => {
    res.render('photobook/show', {
        photo: res.locals.photo
    })
});
photoRouter.delete('/:id([0-9]+)', photoController.delete);


module.exports = photoRouter;