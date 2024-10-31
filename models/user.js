const { required } = require("joi");
const mongoose= require("mongoose");
const schema=mongoose.Schema;
const passsportLocalMongoose =require("passport-local-mongoose");
//creating schema
const userSchema = new schema({
    email :{
        type:String ,
        required:true
    }
});

userSchema.plugin(passsportLocalMongoose);
module.exports = mongoose.model('User', userSchema);