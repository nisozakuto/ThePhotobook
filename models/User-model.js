const db = require('../db/config')

class User {
    constructor({ id, username, password_digest }) {
        this.id = id;
        this.username = username;
        this.password_digest = password_digest;
    }

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
}

module.exports = User

//User.getAll().then(console.log);

// const user = new User({
//     username: 'nisoTest',
//     password_digest: 'loremipsum'
// })

// user.save().then(console.log)
// User.findByUserName('nisoTest').then(console.log)