const express=require('express');
const router= express.Router();
const wrapAsync=require('../utils/wrapAsync.js')
const {listingSchema}=require('../schema.js')
const ExpressError=require('../utils/ExpressError.js')
const Listing=require('../models/listing.js');
const {isLoggedIn}=require('../middleware.js')
const {isOwner}=require('../middleware.js')
const listingControllers=require('../controllers/listing.js')
const multer  = require('multer')
const {storage}=require('../cloudConfig.js')
const upload = multer({ storage })


const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(', ');
        next(new ExpressError(400, errMsg));
    } else {
        next();
    }
};


router.route('/')
//Index
.get(wrapAsync(listingControllers.index))
//Create Route
.post(isLoggedIn,upload.single('image'),wrapAsync(listingControllers.create))


//Create Route
router.get('/new',isLoggedIn,(req,res)=>{
    res.render('listings/create.ejs')
    
})

router.route('/:id')
//Update Route
.put(isLoggedIn,isOwner,upload.single('image'),wrapAsync(listingControllers.updated))
//Delete Route
.delete(isLoggedIn,isOwner,wrapAsync(listingControllers.delete))
//Show Route
.get(wrapAsync(listingControllers.show))


//Update route
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync(listingControllers.update));







module.exports=router;