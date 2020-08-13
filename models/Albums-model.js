const db = require('../db/config');
const Photo = require('./Photos-model');

class Album {
    constructor(albums) {
        this.id = albums.id || null;
        this.name = albums.name;
        this.user_id = albums.user_id || 1;
    }

    static getAll() {
        return db.manyOrNone('SELECT * FROM albums WHERE user_id = $1',)
            .then((albums) => {
                return albums.map((album) => {
                    return new this(album);
                })
            })
    }

    static getById(id) {
        return db.oneOrNone("SELECT * FROM albums WHERE id =$1", id)
            .then((album) => {
                if (album) return new this(album);
                throw new Error("Album not found");
            })
    }

    photos() {
        return db.manyOrNone(`
        SELECT * FROM pictures 
        JOIN albums 
        ON pictures.album_id = albums.id
        WHERE albums.id = $1
        `, this.id)
            .then((photos) => {
                return photos.map((photo) => {
                    return new Photo(photo)
                })
            })
    }

    save() {
        return db
            .one(
                `
            INSERT INTO albums(name, user_id)
            VALUES($/name/, $/user_id/)
            RETURNING *`,
                this
            )
            .then((album) => {
                return Object.assign(this, album);
            });
    }
    delete() {
        return db.none('DELETE FROM albums WHERE id = $/id/', this);
    }
}

module.exports = Album;