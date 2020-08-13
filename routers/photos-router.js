const express = require('express');
const photoRouter = express.Router();

const photoController = require('../controllers/photos-controller');

photoRouter.get('/', photoController.index);
photoRouter.post('/photos', photoController.create);
photoRouter.delete('/:id([0-9]+)', photoController.delete);
photoRouter.get('/:id([0-9]+)', photoController.show, (req, res) => {
    res.render('photos/show', {
        data: {
            // photo: res.locals.photo
            // picture: picture
        }
    })
});

module.exports = photoRouter;