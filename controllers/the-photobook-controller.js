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
            // console.log(picture.pic_url)
            // res.local.picture = picture;
            // next();

            res.render('photobook/show'), {
                message: "OK",
                data: { picture },
            }
        })
};

photoController.create = (req, res, next) => {
    new Photo({
        pic_url: req.body.pic_url,
        albumId: req.body.albumId,
        pic_desc: req.body.pic_desc,
        liked: req.body.liked,
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