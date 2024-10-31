const express=require("express");
const router=express.Router();
const wrapAsynch =require('../utils/wrapAsynch.js');
const passport = require("passport");
const {saveRedirectUrl} =require("../middleware.js");
const userController =require("../controllers/user.js");

router
    .route("/signup")
    .get(wrapAsynch(userController.renderSignUpForm))    //new route
    .post(wrapAsynch(userController.signUp));              //create route

router
    .route("/login")
    .get(wrapAsynch(userController.renderLoginForm))                 //login form
    .post(saveRedirectUrl, passport.authenticate("local", {   //login
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
    );

//logout route
router
    .route("/logout") 
    .get(wrapAsynch(userController.logout));         //logout fork

module.exports=router;