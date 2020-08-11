const Photo = require('../models/the-photobook-models');
const photoController = {};

photoController.index = (req, res) => {
    Photo.getAll()
        .then((photos) => {
            res.render('pictures', {
                message: 'ok',
                data: { photos }
            });
        })
    //Catch here
}

module.exports = photoController;