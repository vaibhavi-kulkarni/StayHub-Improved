const express = require("express");
const router = express.Router();
const wrapAsynch = require('../utils/wrapAsynch.js');
const Listing = require("../models/listing");
const { isLoggedIn ,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsynch(listingController.index))                               //index route
    .post(                                                     //create route
        isLoggedIn, 
        upload.single('listing[image]'),
        validateListing ,
        wrapAsynch(listingController.createListing)
    );   
    
router
    .route("/new")
    .get(isLoggedIn, wrapAsynch(listingController.renderCreateForm));       //new route

router
    .route("/:id")
    .get(wrapAsynch(listingController.showListing))             //show route
    .put(
        isLoggedIn,
        isOwner, 
        upload.single('listing[image]'),
        validateListing, 
        wrapAsynch(listingController.updateListing)
    )  //update route
    .delete(isLoggedIn,isOwner, wrapAsynch(listingController.destroyListing));      //delete route

router
    .route("/:id/edit")
    .get(isLoggedIn ,isOwner ,wrapAsynch(listingController.renderEditForm))

module.exports = router;