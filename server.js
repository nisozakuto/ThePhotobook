const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const usersRouter = require('./routers/users-router');
const authRouter = require('./routers/authRouter');
const albumRouter = require('./routers/albums-router');
const photosRouter = require('./routers/photos-router');

const app = express();
require('dotenv').config();

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Below for the user auth
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
//  till here

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('index', {
        appName: 'The photobook'
    });
});
// app.use('/photobook', photobookRouter);
app.use('/albums', albumRouter);
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/photos', photosRouter);

app.use('*', (req, res) => {
    res.render('404', {
        appName: 'The photobook'
    });
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})