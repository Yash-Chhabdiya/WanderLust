const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../model/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { createReview, destroyReview } = require("../controllers/reviews.js");

router.post("/",isLoggedIn,validateReview,wrapAsync(createReview))

// delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(destroyReview))
module.exports = router;