// Create Strategy
const Strategy = require("passport-local").Strategy;

// Import helpers for bycrpt
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


// Import models
const User = require("../../../models/User_model");

const LoginStrategy = new Strategy({ usernameField: 'email' },

  function (email, password, done) {

    User.findOne({email}).lean().exec((err, user) => {

        if (err) {
            return done(err, null);
        }

        if (!user) {
            return done('No User Found', null);
        }

        const validatePassword = bcrypt.compareSync(password, user.password);

        if(!validatePassword)
        {
            return done("Email or Password Incorrect", null);
        }

        return done(null,user);

    });
   
  });

module.exports = LoginStrategy;