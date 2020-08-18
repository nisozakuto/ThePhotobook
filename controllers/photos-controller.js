const Photo = require('../models/Photos-model');
const helper = require('../services/photo-helpers')
const photoController = {};

photoController.index = (req, res) => {
    Photo.getAll()
        .then((e) => {
            console.log(e)
        })
        .then((photos) => {
            console.log("Getting all the pictures")
            res.render('photos',
                {
                    message: 'ok',
                    data: { photos }
                })
        })
};

photoController.show = (req, res, next) => {
    Photo.getById(req.params.id)
        .then((photo) => {
            res.locals.photo = photo;
            next();
        })
}

photoController.create = async (req, res, next) => {
    // console.log('REQ, photocontroller', req)    
    console.log('album, id', res.locals.album_id)
    console.log('RES, photocontroller', req.body.name)
    const apiPhotos = await helper.testAPicture(req.body.name)
    new Photo({
        pic_url: apiPhotos.photos[1].src.medium,
        album_id: res.locals.album_id,
        pic_desc: 'desc,',
        liked: req.body.liked || true,
        pic_url_full_size: apiPhotos.photos[1].src.original
    })
        .save()
        .then((newPhoto) => {
            console.log("newphotoID ", newPhoto.album_id)
            res.redirect(`/albums/${newPhoto.album_id}`)
        })
}

var deletedPhotoId;
photoController.delete = (req, res, next) => {
    Photo.getById(req.params.id)
        .then((photo) => {
            console.log("deleting: ", photo)
            deletedPhotoId = photo.album_id
            return photo.delete();
        })
        .then((e) => {
            console.log(e);
            res.redirect(`/albums/${deletedPhotoId}`)
        })
}
module.exports = photoController;