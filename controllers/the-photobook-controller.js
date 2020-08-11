const Photo = require('../models/Photo');
const photoController = {};

photoController.index = (req, res) => {
    Photo.getAll()
        .then((photos) => {
            res.render('albums/index', {
                message: 'ok',
                data: { photos }
            });
        })
    //Catch here
}