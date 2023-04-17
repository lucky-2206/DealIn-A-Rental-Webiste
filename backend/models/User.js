const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    profileImg:{
        type:String,
        default:""
    }

},{timestamp:true})

module.exports = mongoose.model("User",UserSchema)