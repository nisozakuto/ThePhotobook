// const express = require('express');
// const photobookRouter = express.Router();

// const photobookController = require('../controllers/the-photobook-controller');
// const photoHelpers = require('../services/photo-helpers')
// const photoHelper = (req, res, next) => {
//     console.log(res.locals);
//     console.log(res.locals.picture);
//     console.log(res.locals.picture.pic_url)
//     next();
// }

// photobookRouter.get('/', photobookController.index);
// // photobookRouter.get('/:id([0-9]+)', photobookController.show);
// photobookRouter.post('/photobook', photobookController.create);
// photobookRouter.delete('/:id([0-9]+)', photobookController.delete);
// photobookRouter.get('/:id([0-9]+)', photobookController.show, photoHelpers.getAPicture, (req, res) => {
//     res.render('photobook/show', {
//         data: {
//             photo: res.locals.photo

//             // picture: picture
//         }
//     })
// });


// module.exports = photobookRouter;