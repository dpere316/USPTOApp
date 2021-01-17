// Import Passport
const passport = require('passport');

// Import strategies
const SignupStrategy = require('./Strategies/SignupStrategy');
const LoginStrategy = require('./Strategies/LoginStrategy');


passport.use(local-login, LoginStrategy);
passport.use(local-signup, SignupStrategy);

module.exports = passport;
