const mongoose = require('mongoose')

const ProductSchema=new mongoose.Schema({
    currentOwner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required :true,
    },
    title:{
        type:String,
        required:true,
        min:8,
    },
    desc:{
        type:String,
        required:true,
        min:20,
    },
    type:{
        type:String,
        enum:["Electronic_Gadgets","Men_Fashion","Women_Fashion","Sports","Household_Appliances"],
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    featured:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model("Product",ProductSchema)