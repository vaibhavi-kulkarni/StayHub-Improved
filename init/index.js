const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Replicaa');
}

main()
    .then(()=>{
        console.log("success with mongodb connection");
    })
    .catch((err)=>{
        console.log(err);
    });

const initDb= async()=>{
    Listing.deleteMany({});
    initData.data =initData.data.map((obj)=>({...obj ,owner:'670be3eac61cf348a3288505'}));
    await Listing.updateMany({}, { $set: { owner: '670be3eac61cf348a3288505', reviews: [] } });
    Listing.insertMany(initData.data);
    await Listing.updateMany({}, { $set: { owner: '670be3eac61cf348a3288505', reviews: [] } });
    console.log("data initialized");
};

initDb();