const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User');
});

// Login Page
router.get('/Login', function(req, res, next) {
  res.send('Login');
});

// SignUp Page
router.get('/Signup', function(req, res, next) {
  res.send('Signup');
});


module.exports = router;
