const mongoose= require('mongoose');
const Review= require('./reviews');
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:[
        { 
            url: {
                type:String,
                default:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                set:(v) => 
                 v===""? "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v

            }, 
            filename: {type:String}
        }],
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String

    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

listingSchema.post('findOneAndDelete',async(listing)=>{
    if (listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})

    }
})
const Listing = mongoose.model('Listing',listingSchema);

module.exports=Listing;
