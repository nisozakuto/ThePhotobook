const Photo = require('../models/Photos-model');

const photoController = {};

photoController.index = (req, res) => {
    Photo.getAll()
        .then((e) => {
            console.log(e)
        })
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
        .then((photo) => {
            // console.log(photo), 
            res.locals.photo = photo;
            next();
            // res.render('photobook/show'), {
            //     message: "OK",
            //     data: { photo },
            // }
        })
}

photoController.create = (req, res, next) => {
    console.log("res.locals.photos", res.locals.photos);
    new Photo({
        pic_url: res.locals.photos, // || req.body.pic_url || // Test 'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg?auto=compress&cs=tinysrgb&h=350',
        album_id: 104,
        pic_desc: req.body.pic_desc,
        liked: req.body.liked || true,
        pic_url_full_size: req.body.pic_url_full_size || 'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg',
    })
        .save()
        .then((newPhoto) => {
            console.log('createLog: ', newPhoto)
            res.redirect(`/albums/${newPhoto.album_id}`)
            // res.redirect('/photos'), {
            //     data: e
            // };

            // res.render('photos'), {
            //     // res.json({
            //     message: "ok",
            //     data: photo
            // }
        })
}
var deletedPhotoId;
// I used this work around but am not proud of it
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