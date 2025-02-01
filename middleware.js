const Listing = require("./model/listing.js");
const Review = require("./model/review.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn= (req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirect Url
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be Logged In to create listing!");
       return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    } 
    next();
}

module.exports.isOwner = async(req,res,next)=>{
    let{id} = req.params;
    let listing =  await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","This listing doesn't belong to you")
      return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.validateListing=(req,res,next)=>{
    let {error} =  listingSchema.validate(req.body);
//    console.log(error);
   if(error){
    let errMsg = error.details.map((rl)=>rl.message).join(",")
throw new ExpressError(400,error)
   }else{next()}
// next();
}

module.exports.validateReview=(req,res,next)=>{
    let {error} =  reviewSchema.validate(req.body);
//    console.log(error);
   if(error){
    let errMsg = error.details.map((rl)=>rl.message).join(",")
throw new ExpressError(400,error)
   }else{next()}
// next();
}




module.exports.isReviewAuthor = async(req,res,next)=>{
    let{id,reviewId} = req.params;
    let review =  await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
      req.flash("error","This Review doesn't belong to you")
      return res.redirect(`/listings/${id}`);
    }
    next();
};
