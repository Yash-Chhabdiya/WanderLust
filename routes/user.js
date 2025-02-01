const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signUp, renderSignUpForm, renderLoginForm, login, logout } = require("../controllers/users.js");
const { render } = require("ejs");


router.route("/signup")
.get(renderSignUpForm)
.post( wrapAsync(signUp));


router.route("/login").get(renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true},),login);


router.get("/logout",logout)
module.exports = router;