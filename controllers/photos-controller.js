const Photo = require('../models/Photos-model');

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

// photoController.index = (req, res) => {
//     console.log("photocontroller: ", req.params.id)
//     Photo.albumPhotos(id)
//         .then((e) => {
//             console.log(e)
//         })
//         .then((photos) => {
//             res.render('photos',
//                 {
//                     message: 'ok',
//                     data: { photos }
//                 })
//         })
// };

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
    console.log("AlbumID", res.body)
    // console.log("req.params", req)

    new Photo({
        pic_url: req.body.pic_url, // || req.body.pic_url || // Test 'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg?auto=compress&cs=tinysrgb&h=350',
        album_id: req.body.album_id,
        pic_desc: 'desc,',
        liked: req.body.liked || true,
        pic_url_full_size: res.locals.photos.original || 'NA', // || req.body.pic_url_full_size || 'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg',
    })
        .save()
        .then((newPhoto) => {
            console.log("newphotoID ", newPhoto.album_id)
            res.redirect(`/albums/${newPhoto.album_id}`)
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