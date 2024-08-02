const express=require('express');
const router= express.Router({mergeParams:true});
const wrapAsync=require('../utils/wrapAsync.js')
const ExpressError=require('../utils/ExpressError.js')
const {reviewSchema}=require('../schema.js')
const Review= require('../models/reviews.js');
const Listing=require('../models/listing.js');
const { isLoggedIn,isRevAuthor } = require('../middleware.js');
const reviewsController= require('../controllers/reviews.js')


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if (error){
        let errMsg=error.details.map((el)=>{el.message}).join(",");
        throw new ExpressError(400,error);
    }else{
        next();
    }
}   


//Delete Review Route
router.delete('/:reviewId',isLoggedIn,isRevAuthor,wrapAsync(reviewsController.delete))


//Review Route
router.post('/',isLoggedIn,validateReview,wrapAsync(reviewsController.create))

module.exports=router;