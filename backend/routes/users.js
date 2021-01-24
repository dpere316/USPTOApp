const express = require("express");
const router = express.Router();
const passport = require("../auth/passport/index");


/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("User");
});

// Login Handle
router.post("/Login", function (req, res, next) {

  // Passport callback
  passport.authenticate("local-login", function (error, user, info) {

    if (error) {
      res.status(500).json({
        message: error || "Oops something happened",
        error: error.message || "Internal server error"
      });
    }
    return res.json(user);

  })(req, res, next);
});

// Signup Handle
router.post("/register", function (req, res, next) {

  // Passport callback
  passport.authenticate("local-signup", function (error, user, info) {
    if (error) {
      res.status(500).json({
        message: error || "Oops something happened",
      });
    }
    return res.json(user);
    
  })(req, res, next);
});


module.exports = router;
