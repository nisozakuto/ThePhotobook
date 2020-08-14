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
        pic_url: req.body.pic_url || 'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg?auto=compress&cs=tinysrgb&h=350',
        album_id: 71,
        pic_desc: req.body.pic_desc || 'Test image',
        liked: req.body.liked || true,
        pic_url_full_size: req.body.pic_url_full_size || 'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg',
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