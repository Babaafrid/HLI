const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    name: {type:String,required:true},
    image: {type:String,required:true},
    cost: {type:Number,required:true},
    description: {type:String,required:true},
    rating: {type:Number,required:true}
},{timestamps:true}
)
const policyModel = mongoose.model('policies',policySchema)
module.exports=policyModel