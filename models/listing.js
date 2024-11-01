const mongoose= require("mongoose");
const schema=mongoose.Schema;
const Review=require("./reviews");

//creating schema
const listingSchema =new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
      url:String,
      filename : String
    },
    price:{
        type:String,
        min :2000,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    reviews :[{
        type : schema.Types.ObjectId,
        ref: "Review",
    }],
    owner : {
        type : schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews },});
    }
});

//creating model from schema
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;