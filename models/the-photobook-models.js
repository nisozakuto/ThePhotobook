const db = require('../db/config');

class Photo {
    constructor(photos) {
        this.id = photos.id || null;
        this.pic_url = photos.pic_url;
        this.albumId = photos.albumId;
        this.pic_desc = photos.pic_desc;
        this.liked = photos.liked;
    }

    static getAll() {
        return db.manyOrNone('SELECT * FROM pictures')
            .then((photos) => {
                return photos.map((picture) => {
                    return new this(picture);
                })
            })
    }

    static getById(id) {
        return db.oneOrNone('SELECT * FROM pictures WHERE id =$1', id)
            .then((photo) => {
                if (photo) return new this(photo);
                throw new Error("Photo not found");
            });
    }
    save() {
        return db
            .one(
                `
            INSERT INTO photos(pic_url, albumId, pic_desc, liked)
            VALUES ($/pic_url/, $/albumId/, $/pic_desc/, $/liked/)
            RETURNING *`,
                this
            )
            .then((photo) => {
                return Object.assign(this, photo);
            });
    }
    update(changes) {

    }
    delete() {
        return db.none('DELETE FROM pictures WHERE id = $/id/', this);
    }
}

module.exports = Photo;