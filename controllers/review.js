const Review=require("../models/reviews.js");
const Listing =require("../models/listing");

module.exports.createReview =async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    let review =new Review(req.body.review);
    review.author =req.user._id;
    await listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success","new review created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res,next)=>{
    let {id , reviewId}=req.params;
     await Listing.findByIdAndUpdate(id, {$pull :{reviews :reviewId}});
    await Review.findByIdAndDelete(id);
    req.flash("success","review deleted!");
    res.redirect(`/listings/${id}`);
};

