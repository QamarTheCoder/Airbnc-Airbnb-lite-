const Review= require('../models/reviews.js');
const Listing=require('../models/listing.js');

module.exports.delete= async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Review Deleted!")

    res.redirect(`/listings/${id}`)

}

module.exports.create=async (req,res)=>{
    let {id}=req.params;
    let {rating,comment}=req.body
    let listdata=await Listing.findById(id);
    let newRev=new Review({
        content:comment,
        rating:rating
    })
    newRev.author=req.user._id;
    listdata.reviews.push(newRev)

    await newRev.save();
    await listdata.save();
    req.flash("success","Review Added!")

    res.redirect(`/listings/${id}`)
}