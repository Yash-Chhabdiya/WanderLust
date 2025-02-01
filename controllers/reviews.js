const Listing = require("../model/listing.js");

const Review = require("../model/review.js");



module.exports.createReview = async(req,res)=>{
    // console.log("gfhbfr")
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author= req.user._id
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    // res.redirect(`/listings/${listing._id}`);
    console.log("nre review saved");
    req.flash("success","New Review Created!");

    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted!");

    res.redirect(`/listings/${id}`);
};