const bcrypt = require('bcryptjs');
const User = require('../models/User-model')

const usersController = {
  index(req, res, next) {
    // req.user
    //   .findUserPictures()
    //   .then((photos) => {
    res.render('userPage',
      {
        message: "ok working",
        data:
        {
          user: req.user,
          // photos,
        }
      }
    )
    // res.json({
    //   message: "ok working",
    //   data:
    //   {
    //     user: req.user,
    //     // photos,
    //   }
    // })
    // })
  },

  create(req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    new User({
      username: req.body.username,
      password_digest: hash
    }).save()
      .then(user => {
        req.login(user, (err) => {
          if (err) return next(err);
          res.redirect('/albums');
        })
      }).catch(next);
  }
}

module.exports = usersController