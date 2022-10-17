const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel")
const Policy = require("../models/policyModel")

router.post("/bookpolicy",async(req,res)=>{
    req.body.transactionId=1234;
    try{
            const newbooking = new Booking(req.body)
            await newbooking.save()
            const policy = await Policy.findOne({_id:req.body.policy})
            await policy.save()
            res.send("Payment Success")
        }
    catch(error){
        console.log(error)
        return res.status(400).json(error);
    }
});

router.get("/getallbookings", async(req, res) => {
    try {

        const bookings = await Booking.find().populate('policy')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});

module.exports=router