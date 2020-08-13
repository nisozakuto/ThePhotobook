const db = require('../db/config')

class Photo {
    constructor(photo) {
        this.id = photo.id || null;
        this.pic_url = photo.pic_url;
        this.album_id = photo.album_id;
        this.pic_desc = photo.pic_desc;
        this.liked = photo.liked;
        this.pic_url_full_size = photo.pic_url_full_size;
    }

    static getAll() {
        return db.manyOrNone('SELECT * FROM pictures')
            .then((photos) => {
                return photos.map((photo) => {
                    return new this(photo);
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
            INSERT INTO pictures(pic_url, album_id, pic_desc, liked, pic_url_full_size)
            VALUES ($/pic_url/, $/album_id/, $/pic_desc/, $/liked/, $/pic_url_full_size/)
            RETURNING *`,
                this
            )
            .then((photo) => {
                return Object.assign(this, photo);
            });
    }

    delete() {
        return db.none('DELETE FROM pictures WHERE id = $/id/', this);
    }
}

module.exports = Photo;