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
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
};

photoController.show = (req, res, next) => {
    Photo.getById(req.params.id)
        // .then((photo) => {
        //     res.locals.photo = photo;
        //     next();
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).json({ err, message: err.message });
        // });
        .then((picture) => {
            res.locals.picture = picture;
            next();
            // res.render('pictures'), {
            //     message: "OK",
            //     data: { picture },
            // }
        })
};

photoController.create = (req, res, next) => {
    new Photo({
        // pic_url: req.body.pic_url || 'test',
        // album_id: req.body.album_id || 'test',
        // pic_desc: req.body.pic_desc || 'test',
        // liked: req.body.liked || 'test',
        pic_url: 'url',
        album_id: 1,
        pic_desc: 'desc',
        liked: true,
    }).save()
        .then(() => {
            res.redirect('/photobook')

        }).catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
};

photoController.update = (req, res, next) => {

};
photoController.delete = (req, res, next) => {
    Photo.getById(req.params.id)
        .then((picture) => {
            return picture.delete();
        })
        .then(() => {
            res.redirect('/photobook');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
};



module.exports = photoController;