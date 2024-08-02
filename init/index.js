const mongoose= require('mongoose');
const Listing=require('../models/listing.js')
const initData=require('./init.js')

main().then(()=>{
    console.log('Connected')
}).catch((err)=>{
        console.log(err)    
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnc")
}

const data = async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:"669b4f02385c3c865eb31566"}))
    await Listing.insertMany(initData.data);
    console.log('Initialized')
}

data()