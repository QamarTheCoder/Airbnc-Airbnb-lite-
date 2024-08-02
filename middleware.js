const Listing=require('./models/listing');
const Review = require('./models/reviews');

module.exports.isLoggedIn= (req,res,next)=>{
    if (!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in")
        return res.redirect('/login')
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if (req.session.redirectUrl){
        res.locals.RedirectUrl=req.session.redirectUrl;
        
    }
    next();
}

module.exports.isOwner= async(req,res,next)=>{
    let {id}=req.params;
    let ll=await Listing.findById(id);
    if (!ll.owner.equals(res.locals.currUser._id)){
        req.flash('error','You are not the owner');
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.isRevAuthor= async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)){
        req.flash('error','You are not the owner');
        return res.redirect(`/listings/${id}`)
    }
    next();
}