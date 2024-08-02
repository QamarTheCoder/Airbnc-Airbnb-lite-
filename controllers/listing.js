const Listing=require('../models/listing.js');


module.exports.index=(req,res)=>{
    Listing.find({}).then((allListings)=>{
        res.render('listings/index.ejs',{allListings})
    })
}

module.exports.create=async (req,res,next)=>{
    console.log(req.body)
    let {title,description,location,country,image,price}=req.body;
    
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,filename)
    let createNew= new Listing({title:`${title}`,description:`${description}`,location:`${location}`,country:`${country}`,image:[{url:`${url}`,filename:`${filename}`}],price:`${price}`})
   
    createNew.owner=req.user._id
    await createNew.save()
    req.flash("success","New Listing Created!")
    res.redirect('/listings')   
}

module.exports.update=(req,res)=>{
    let {id}=req.params;
    
    Listing.findById(id).then((resdata)=>{
        if (!resdata){
            req.flash("error","Listing Does not Exist!")
            res.redirect('/listings')
        }
        let ORIGINAL_IMAGE=resdata.image[0].url;
        ORIGINAL_IMAGE=ORIGINAL_IMAGE.replace('/upload','/upload/w_400')
        res.render('listings/edit.ejs',{resdata,ORIGINAL_IMAGE});
    }).catch((err) => {
        console.error(err);
        res.redirect('/listings'); // Handle error appropriately, e.g., redirect to index
    });
}

module.exports.updated=(req,res)=>{
    let {id}=req.params;
    let {title,description,location,country,image,price}=req.body;
    if (req.file){
        let filename=req.file.filename;
        let url=req.file.path;
        Listing.findByIdAndUpdate(id,{title:`${title}`,description:`${description}`,location:`${location}`,country:`${country}`,image:[{url:`${url}`,filename:`${filename}`}],price:`${price}`}).then((result)=>{
            req.flash("success","Listing Updated!")
            res.redirect(`/listings/${id}`)
        })
    }else{
        Listing.findByIdAndUpdate(id,{title:`${title}`,description:`${description}`,location:`${location}`,country:`${country}`,price:`${price}`}).then((result)=>{
            req.flash("success","Listing Updated!")
            res.redirect(`/listings/${id}`)
        })
    }

    
}

module.exports.delete=(req,res)=>{
    let {id}=req.params;
    Listing.findByIdAndDelete(id).then((result)=>{
        req.flash("success","Listing Deleted!")
        res.redirect('/listings')
    })
}

module.exports.show=(req,res)=>{
    let {id}=req.params;
    Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner").then((data)=>{
        if (!data){
            req.flash("error","Listing Does not Exist!")
            res.redirect('/listings')
        }
        console.log(data)
        res.render('listings/show.ejs',{data})
    })
}