const express = require("express");
const router = express.Router();
const passport = require("../auth/passport/index");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("User");
});

// Login Page
router.get("/Login", function (req, res, next) {
  res.send("Login");
});

// SignUp Page
router.get("/Signup", function (req, res, next) {
  res.send("Signup");
});

// Register Handle
router.post("/register", function (req, res, next) {
  passport.authenticate("local-signup", function (error, user, info) {
    if (error) {
      res.status(500).json({
        message: "Oops something happened",
        error: error.message || "Internal Server Error",
      });
    }
    return res.json({
      user,
      message: "User is authenticated",
    });
  })(req, res, next);
});

module.exports = router;
