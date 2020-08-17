const Album = require('../models/Albums-model');

const AlbumController = {};

AlbumController.index = (req, res, next) => {
    Album.findUserAlbums(req.user.id)
        .then((albums) => {
            res.render('albums',
                {
                    message: 'ok',
                    data: { albums }
                })
        }).catch(next);
};

AlbumController.show = async (req, res, next) => {
    const album = await Album.getById(req.params.id)
    console.log("Album ID here", req.params.id)
    const photos = await album.photos()
    res.render('photos',
        {
            message: 'Ok',
            data: {
                photos,
                id: req.params.id,
            }
        })
}

AlbumController.create = (req, res, next) => {
    new Album({
        name: req.body.name,
        user_id: req.user.id,
        album_cover: res.locals.photos.medium
    })
        .save()
        .then((album) => {
            console.log("Name: ", album.name)
            console.log("albumid: ", album.id)
            res.redirect('/albums/')
        }).catch(next);
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