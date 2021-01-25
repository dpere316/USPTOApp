// Import Passport
const passport = require('passport');

// Import models
const User = require("../../models/User_model");

passport.serializeUser(function(user, done) {
    done(null, user.email);
  });
   
  passport.deserializeUser(function(email, done) {
    User.findOne({email}).lean().exec((err,user) => {
        done(err,user)
    })
  });

// Import strategies
const SignupStrategy = require('./Strategies/SignupStrategy');
const LoginStrategy = require('./Strategies/LoginStrategy');

passport.use('local-login', LoginStrategy);
passport.use('local-signup', SignupStrategy);

module.exports = passport;
