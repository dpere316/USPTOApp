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
      return res.status(500).json({
        message: error || "Oops something happened",
      });
    }
    
    // Persistent Login
    req.logIn(user, function(error){
      if(error) {
        return res.status(500).json({
          message: error || "Oops something happend"
        })
      }
      // Adds a property to object and lets us know that the user has been authenticated.
      user.isAuthenticated = true; 
  
      return res.json(user);

    });
    

  })(req, res, next);
});

// Signup Handle
router.post("/register", function (req, res, next) {

  // Passport callback
  passport.authenticate("local-signup", function (error, user, info) {
    
    if (error) {
      return res.status(500).json({
        message: error || "Oops something happened",
      });
    }

   // Persistent Login
   req.logIn(user, function(error){
    if(error) {
      return res.status(500).json({
        message: error || "Oops something happend"
      })
    }
    // Adds a property to object and lets us know that the user has been authenticated.
    user.isAuthenticated = true; 

    return res.json(user);

  });

    
  })(req, res, next);
});





module.exports = router;
