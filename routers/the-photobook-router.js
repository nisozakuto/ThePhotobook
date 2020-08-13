const express = require('express');
const photobookRouter = express.Router();

const photobookController = require('../controllers/the-photobook-controller');
const getAPicture = require('../services/photo-helpers')

photobookRouter.get('/', photobookController.index);
// photobookRouter.get('/:id([0-9]+)', photobookController.show);
photobookRouter.post('/', photobookController.create);
photobookRouter.delete('/:id([0-9]+)', photobookController.delete);

photobookRouter.get('/:id([0-9]+)', photobookController.show, (req, res) => {
    res.render('photobook/show', {
        picture: res.locals.picture,
    })
});
// photobookRouter.post('/', photobookController.create);
//POST error: Route.post() requires a callback function but got a [object Undefined]
// photobookRouter.get('/', (req, res) => {
//     res.render('photobook')
// })

// photobookRouter.get('/:id([0-9]+)', (req, res) => {
//     res.render('photobook/show', {
//         photo: res.locals.photo,
//     });
// });




// pizzaRoutes.get('/', pizzaController.index);
// pizzaRoutes.get('/add', (req, res) => {
//     res.render('pizzas/add');
// });

// pizzaRoutes.post('/', pizzaController.create);
// pizzaRoutes.get("/:id([0-9]+)", pizzaController.show);
// pizzaRoutes.put('/:id', pizzaController.update);
// pizzaRoutes.delete('/:id', pizzaController.destroy);

// module.exports = pizzaRoutes;




module.exports = photobookRouter;