const db = require('../db/config')

class User {
    constructor({ id, username, password_digest }) {
        this.id = id;
        this.username = username;
        this.password_digest = password_digest;
    }

    static async getAll() {
        const dbRes = await db.manyOrNone(`SELECT * FROM users;`)
        return dbRes.map((user) => new User(user))
    }
}

module.exports = User
User.getAll().then(console.log);