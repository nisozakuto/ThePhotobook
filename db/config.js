//Below will change when I add the user auth or when publishing to heroku
const pgp = require('pg-promise')();
require('dotenv').config();
let dbData
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    dbData = {
        database: 'the_photobook_dev',
        port: 5432,
        host: 'localhost',
    }
}
else if (process.env.NODE_ENV === 'production') {
    dbData = process.env.DATABASE_URL
}



// const DB_NAME = process.env.DB_NAME || 'the_photobook_dev';
// const options = {
//     query: (e) => {
//         console.log(e.query);
//     },
// };

// const pgp = require('pg-promise')(options);

// function setDatabase() {
//     if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
//         return pgp({
//             database: DB_NAME,
//             port: 5432,
//             host: 'localhost',
//         })
//     } 
//     else {
//         return pgp(process.env.DATABASE_URL)
//     }
// }

// module.exports = setDatabase()

module.exports = pgp(dbData)