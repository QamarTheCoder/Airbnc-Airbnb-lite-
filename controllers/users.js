const User=require('../models/user');

module.exports.signup=async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=  new User({email,username})
        const registeredUser= await User.register(newUser,password)
        console.log(registeredUser)
        req.login(registeredUser,()=>{
            req.flash("success",`Welcome ${username} to Airbnb's first cousin Airbnc`)
            res.redirect('/listings')
        })

       
    }catch (e){
        req.flash("error",e.message)
        res.redirect('/signup')
    }
    
}

module.exports.login=async(req,res)=>{
    req.flash('success','Welcome back to Airbnc')
    let redirecturll=res.locals.RedirectUrl || "/listings"
    res.redirect(redirecturll) 
}
