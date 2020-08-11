const db = require('../db/config');

class Picture {
    constructor(pictures) {
        this.id = pictures.id || null;
        this.picUrl = pictures.picUrl;
        this.albumId = pictures.albumId;
        this.pic_desc = pictures.pic_desc;
        this.liked = pictures.liked;
    }

    static getAll() {
        return db.manyOrNone('SELECT * FROM pictures')
            .then((pictures) => {
                return pictures.map((picture) => {
                    return new this(picture);
                })
            })
    }
}

module.exports = Picture;