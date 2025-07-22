const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

//to go to sign-up page
router.get("/signup", userController.renderSignupForm);

//to post the data to database
router.post("/signup", wrapAsync(userController.createUser));

//login route to go to login page
router.get("/login", userController.renderLoginForm);

//to check the data with database and provide authorization
router.post("/login", saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), userController.userLogin);

//logout route 
router.get("/logout", userController.userLogout)



module.exports = router;