const Album = require('../models/Albums-model');

const AlbumController = {};

AlbumController.index = (req, res) => {
    Album.getAll()
        .then((albums) => {
            res.render('albums',
                {
                    message: 'ok',
                    data: { albums }
                })
            // .catch((err) => {
            //     console.log(err);
            //     res.status(500).json({ err, message: err.message });
            // });
        });
};

AlbumController.show = async (req, res, next) => {
    const album = await Album.getById(req.params.id)
    const photos = await album.photos()
    res.render('pictures',
        {
            message: 'Ok',
            data: {
                photos: photos
            }
        })
    //     .then((album) => {
    //         console.log(album.photos())
    //         album.photos()
    //             .then((photos) => {
    //                 res.render('pictures',
    //                     {
    //                         message: 'Ok',
    //                         data: {
    //                             photos: photos
    //                         }
    //                     })
    //             })
    //     })
}

AlbumController.create = (req, res, next) => {
    console.log("body: ", req.body)
    console.log("req.user: ", req.user.id)
    new Album({
        name: req.body.name,
        user_id: req.user.id
    })
        .save()
        .then(() => {
            res.redirect('/albums')
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
};

AlbumController.delete = (req, res, next) => {
    console.log('ID ', req.params.id)
    Album.getById(req.params.id)
        .then((album) => {
            return album.delete();
        }).then(() => {
            res.redirect('/albums');
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ err, message: err.message });
        });
};

module.exports = AlbumController;