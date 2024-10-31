const mongoose= require("mongoose");
const schema=mongoose.Schema;

//creating schema
const reviewSchema =new schema({
    comment : String,
    rating :{
        type:Number,
        min:1,
        max:5
    },
    time :{
        type:Date,
        default : Date.now()
    },
    author:{
        type : schema.Types.ObjectId,
        ref: "User",
    }
});

//creating model from schema
const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;