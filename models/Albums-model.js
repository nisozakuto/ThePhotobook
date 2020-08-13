const db = require('../db/config');

class Album {
    constructor(albums) {
        this.id = albums.id || null;
        this.name = albums.name;
        this.user_id = albums.user_id || 1;
    }

    static getAll() {
        return db.manyOrNone('SELECT * FROM albums')
            .then((albums) => {
                return albums.map((album) => {
                    return new this(album);
                })
            })
    }

    static getById(id) {
        return db.oneOrNone("SELECT * FROM pictures WHERE album_id =$1", id)
            .then((album) => {
                if (album) return new this(album);
                throw new Error("Album not found");
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