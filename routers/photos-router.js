const express = require('express');
const photoRouter = express.Router();

const photoController = require('../controllers/photos-controller');

photoRouter.get('/', photoController.index);
photoRouter.post('/', photoController.create);
photoRouter.get('/:id([0-9]+)', photoController.show, (req, res) => {
    res.render('photobook/show', {
        photo: res.locals.photo
    })
});
photoRouter.delete('/:id([0-9]+)', photoController.delete);


module.exports = photoRouter;