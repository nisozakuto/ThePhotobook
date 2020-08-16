const fetch = require('node-fetch');
require('dotenv').config();
var count = 0;
const getAPicture = (req, res, next) => {
    // fetch(`https://api.pexels.com/v1/search?query=${res.locals.photo.src.medium}`, {
    fetch(`https://api.pexels.com/v1/search?query=ball`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY,
        },
    }).then(fetchRes => fetchRes.json())
        .then(allPictures => {
            // console.log("allpicture", allPictures.photos[1].src);
            console.log("photoHelper ", allPictures.photos[0].src.medium)
            if (allPictures.photos.length) {
                res.locals.photos = allPictures.photos[count].src.medium;
                count++;
                console.log("photoHelper2", res.locals.photos)
            }
            next();
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
};

function fetchAPicture(albumid) {
    fetch(`https://api.pexels.com/v1/search?query=fish`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY,
        },
    })
        .then((fetchRes) =>
            fetchRes.json())
        .then((allPictures) => {
            console.log(allPictures);
            if (allPictures.photos.length) {
                res.locals.photos = allPictures.photos[0].src.medium;
            }
            // const picture = allPictures.photos[0].src.medium;
            // res.locals.aPicture = picture;
            next();
        }).catch((err) => {
            console.log(err);
            next(err);
        });

}


module.exports = {
    getAPicture, fetchAPicture,
};


