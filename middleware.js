const Listing=require("./models/listing");
const expressError = require('./utils/expressError.js');
const { listingSchema ,reviewSchema } = require("./schema.js");
const Review=require("./models/reviews.js");

module.exports.isLoggedIn = (req,res ,next)=>{
    req.session.redirectUrl = req.originalUrl;
    if (!req.isAuthenticated()){
        req.flash("error","you must be logged in to create new listings");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res ,next)=>{
    if(req.session.redirectUrl){
        return res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res ,next)=>{
    let { id } = req.params;
    let listing= await Listing.findById(id);
    if (!listing) { // Check if listing exists
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not a owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview =(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg =error.details.map((el)=>el.message).join(",");
        throw new expressError(400 ,errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor =async(req,res,next)=>{
    let {id ,reviewId }= req.params;
    let review = await Review.findById(reviewId);

    if (!res.locals.currUser || !review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","you have not created this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

