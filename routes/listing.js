const express = require("express");
const router = express.Router();
const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer  = require('multer')
const{storage}=require("../cloudConfig.js")
const upload = multer({ storage})

const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const { index, renderNewForm, showListing, createListing, renderEditForm, destroyListing, updateListing ,SEARCH} = require("../controllers/listings.js");


router.get("/new",isLoggedIn,renderNewForm)  

router.post("/search",wrapAsync(SEARCH))
router.route("/")
.get(wrapAsync(index) )
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(createListing)) 

// .post( upload.single('listing[image]'),(req, res )=> {
//     console.log(req.file);
//     res.send(req.file);
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//   });
  
// Index route

router.route("/:id")
.get(wrapAsync(showListing) )
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(destroyListing))

//new listing

//Show Route
// router
// adding new LISTING

// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(renderEditForm));



module.exports =router;
