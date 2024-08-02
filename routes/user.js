const express=require('express');
const router=express.Router({mergeParams:true});
const User=require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
let {saveRedirectUrl}=require('../middleware');
const usersController=require('../controllers/users')


router.route('/signup')
.get((req,res)=>{
    res.render('./users/signup.ejs')
})
.post(wrapAsync(usersController.signup))

router.route('/login')
.get((req,res)=>{
    res.render("./users/login.ejs")
})
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),usersController.login)



router.get('/logout',(req,res,next)=>{
    req.logout((err)=>{
        if (err){
            next(err);
        }
        req.flash('success','You are logged out now!');
        res.redirect('/listings')
    })
})

module.exports=router;