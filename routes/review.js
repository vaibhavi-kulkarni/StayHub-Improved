const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsynch =require('../utils/wrapAsynch.js');
const {validateReview , isLoggedIn , isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");

//review post listing 
router.post("/", isLoggedIn ,validateReview, wrapAsynch(reviewController.createReview));

//review delete listing
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor ,
    wrapAsynch(reviewController.destroyReview)
);

module.exports=router;