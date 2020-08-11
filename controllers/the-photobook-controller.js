const Photo = require('../models/the-photobook-models');
const photoController = {};

photoController.index = (req, res) => {
    Photo.getAll()
        .then((pictures) => {
            res.render('pictures', {
                message: 'ok',
                data: { pictures }
            });
        })
    //Catch here
}

module.exports = photoController;