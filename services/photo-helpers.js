const fetch = require('node-fetch');
require('dotenv').config();
const getAPicture = (req, res, next) => {
    // fetch(`https://api.pexels.com/v1/search?query=${res.locals.photo.src.medium}`, {
    fetch(`https://api.pexels.com/v1/search?query=${res.locals.album.name}`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY,
        },
    }).then(fetchRes => fetchRes.json())
        .then(allPictures => {
            if (allPictures.photos.length) {
                if ((allPictures.photos.length + 1) == count)
                    count = 0;
                res.locals.photos = allPictures.photos[count].src;
                console.log('Photos Object in helper', res.locals.photos.medium)
                console.log("Photos Object: ", allPictures.photos[count].src.original)
                count++;
                return
            }
            next();
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

const getTheFirstPicture = (req, res, next) => {
    console.log("checking the name", req.body.name)
    fetch(`https://api.pexels.com/v1/search?query=${req.body.name}`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY,
        },
    }).then(fetchRes => fetchRes.json())
        .then(allPictures => {
            console.log('got a pic')
            if (allPictures.photos.length) {
                res.locals.photos = allPictures.photos[0].src;
            }
            next();
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};


module.exports = {
    getAPicture, getTheFirstPicture
};