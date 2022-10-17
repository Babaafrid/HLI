const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    policy: {type: mongoose.Schema.Types.ObjectId, ref:'policies'},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    transactionId:{type:String}
},      
{timestamps:true}
)

const bookingModel = mongoose.model('bookings',bookingSchema)
module.exports = bookingModel