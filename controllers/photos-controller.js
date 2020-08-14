const Photo = require('../models/Photos-model');

const photoController = {};

photoController.index = (req, res) => {
    Photo.getAll()
        .then((photos) => {
            res.render('photos',
                {
                    message: 'ok',
                    data: { photos }
                })
        })
};

photoController.show = (req, res, next) => {
    Photo.getById(req.params.id)
        .then((picture) => {
            res.locals.picture = picture;
            next();
        })
}
photoController.create = (req, res, next) => {
    new Photo({
        pic_url: req.body.pic_url || 'test',
        album_id: 3,
        pic_desc: req.body.pic_desc || 'test',
        liked: req.body.liked || true,
        pic_url_full_size: req.body.pic_url_full_size,
    })
        .save()
        .then(() => {
            res.redirect('/photos')
        })
}

photoController.delete = (req, res, next) => {
    Photo.getById(req.params.id)
        .then((photo) => {
            return photo.delete();
        })
        .then(() => {
            res.redirect('/photos');
        })
}
module.exports = photoController;