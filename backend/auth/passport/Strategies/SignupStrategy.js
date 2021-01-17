// Create Strategy
const Strategy = require("passport-local").Strategy;

// Import helpers for bycrpt
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


// Import models
const User = require("../../../models/User_model");

const localStrategy = new Strategy({ passReqToCallback: true },

  function (req, username, password, done) {
    const email = req.body.email;

    User.findOne({email}).lean().exec((err, user) => {

        if (err) {
            return done(err, null);
        }
        if (user) {
            return done('User already exist', null);
        }
        const encryptPassword = bcrypt.hashSync(password, salt);

        let newUser = new User({
            email,
            password:encryptPassword
        });

        newUser.save((error, inserted) => {
            if (error) {
                return done(error, null);
            }
            return done(null, inserted);
        });
    });
  }
);

module.exports = localStrategy;
