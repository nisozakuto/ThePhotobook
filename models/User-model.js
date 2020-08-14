const bcrypt = require('bcryptjs');

const db = require('../db/config')

class User {
    constructor({ id, username, password_digest }) {
        this.id = id || null;
        this.username = username;
        this.password_digest = password_digest;
    }

    // alternative way of doing this
    // constructor(user) {
    //     this.id = user.id || null;
    //     this.username = user.username;
    //     this.password_digest = user.password_digest;
    // }

    static async findByUserName(username) {
        const user = await db.oneOrNone(
            `
            SELECT  * FROM USERS
            WHERE username = $1;
            `,
            username)
        if (user) {
            return new User(user)
        }
        else {
            throw new Error(`No user found for username ${username}`)
        }
    }
    static async getAll() {
        const dbRes = await db.manyOrNone(`SELECT * FROM users;`)
        return dbRes.map((user) => new User(user))
    }

    setPassword(password) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        this.password_digest = hash;
    }

    async save() {
        const savedUser = await db.one(
            `
                INSERT INTO users
                (username, password_digest)
                VALUES 
                ($/username/, $/password_digest/)
                RETURNING *
                `, this)
        return Object.assign(this, savedUser)
    }


    //Below is func is in album-model
    // findUserAlbum() {
    //     return db
    //         .manyOrNone('SELECT * FROM albums WHERE user_id = $1', this.id)
    //         .then((albums) => {
    //             return albums.map((album) => new Album(album));
    //         });
    // }
}

module.exports = User

//User.getAll().then(console.log);

// const user = new User({
//     username: 'nisoTest',
//     password_digest: 'loremipsum'
// })

// user.save().then(console.log)
// User.findByUserName('nisoTest').then(console.log)