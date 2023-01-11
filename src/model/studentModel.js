const mongoose = require("mongoose")
const ObjectId =mongoose.Schema.Types.ObjectId

const studSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required: true
    },
        email:{
            type:String,
            required: true},

        password:{
            type:String,
            required: true},
        isdeleted:{
            type:Boolean,
            default:false
        },
},{timestamps:true})

module.exports = mongoose.model('Student',studSchema)