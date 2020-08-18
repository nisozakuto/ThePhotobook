const fetch = require('node-fetch');
require('dotenv').config();
let count = 0;
const getAlbumPicture = (album_name) => {
    // fetch(`https://api.pexels.com/v1/search?query=${album_name}`, {
    //     headers: {
    //         Authorization: process.env.PEXELS_API_KEY,
    //     },
    // }).then(fetchRes => {
    //     fetchRes.json()
    //     console.log("Controller 4: ", album_name)
    //     console.log("Controller 5: ", fetchRes.json())

    // })
    //     .then(allPictures => {
    //         console.log("Controller 3: ", allPictures)
    //         if (allPictures.photos.length) {
    //             console.log("Controller 1: ", allPictures.photos[count].src)

    //             if ((allPictures.photos.length + 1) == count)
    //                 count = 0;
    //             res.locals.photos = allPictures.photos[count].src;
    //             console.log('Photos Object in helper', res.locals.photos.medium)
    //             console.log("Photos Object: ", allPictures.photos[count].src.original)
    //             count++;
    //             return
    //         }
    //     })
}

const testAPicture = async (album_name) => {
    console.log("async3: ", album_name)
    let mypic = await fetch(`https://api.pexels.com/v1/search?query=${album_name}`, { headers: { Authorization: process.env.PEXELS_API_KEY, }, })
    // console.log("async", testAPicture)
    let pictureJson = await mypic.json()
    // console.log("async2", pictureJson)
    return pictureJson
};


const getAPicture = (req, res, next) => {
    fetch(`https://api.pexels.com/v1/search?query=${album_name}}`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY,
        },
    }).then(fetchRes => fetchRes.json())
        .then(allPictures => {
            console.log(req.body.name)
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
    getAPicture, getTheFirstPicture, getAlbumPicture, testAPicture
};