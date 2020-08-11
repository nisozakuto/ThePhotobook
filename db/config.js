//Below will change when I add the user auth    
const DB_NAME = 'the_photobook_dev'
const options = {
    query: (e) => {
        console.log(e.query);
    },
};

const pgp = require('pg-promise')(options);
module.exports = pgp({
    database: DB_NAME,
    port: 5432,
    host: 'localhost',
});
