const bcrypt = require('bcryptjs');
const User = require('../models/User-model')

const usersController = {
  create(req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    new User({
      username: req.body.username,
      // email: req.body.email,
      password_digest: hash

    }).save()
      .then(user => {
        req.login(user, (err) => {
          if (err) return next(err);
          res.redirect('/users');
        })
      }).catch(next);
  },

  index(req, res, next) {
    console.log('hello from index')
    req.user
      .find
    res.json({
      message: "ok working",
      data:
      {
        user: req.user,
        // pictures,
      }
    })
  }



  // index(req, res, next) {
  //   req.user
  //     .findUserAnimals()
  //     .then((animals) => {
  //       res.json({
  //         message: 'Put a user profile page on this route',
  //         data: {
  //           user: req.user,
  //           animals,
  //         },
  //       });
  //     })
  //     .catch(next);
  // }
}

module.exports = usersController