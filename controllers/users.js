const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signUp } = require("../controllers/users.js");



module.exports.renderSignUpForm =(req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.signUp = async(req,res)=>{
    try{
    let {username , email,password } = req.body;
    const newUser = new User({email,username});
   const registeredUser =  await User.register(newUser, password);
   req.login(registeredUser,(err)=>{
    if(err){
    return next(err)}
    req.flash("success","Welcome to WanderLust!")
   res.redirect("/listings");
   })
   console.log(registeredUser);
   
}catch(e){
    req.flash("error",e.message)
    res.redirect("/signup");
}
};


module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to WanderLust");
    let redirectUrl =res.locals.redirectUrl||"/listings";
    // if(redirectUrl){ 
    res.redirect(redirectUrl);
    // else{
    //     res.redirect();
    // }
};

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","LoggedOut Successfully!");
        res.redirect("/listings");

    })
}