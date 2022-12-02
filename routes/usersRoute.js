const express = require("express");
const router = express.Router();
const User = require("../models/userModel")

router.post("/login",async(req,res)=>{
    const {username,password} =  req.body
    try{
        const user = await User.findOne({username,password})
        if(user){
            res.send(user);
        }
        else{
            return res.status(401).json({message: "Invalid Username or Password"});
        }
    }
    catch(error){
        return res.status(400).json(error);

    }
});

router.post("/register",async(req,res)=>{
    try{
        const newuser = await User.findOne({ username: req.body.username })
        if(newuser){
            return res.status(409).send({message:"User Already Exists"});
        }
        if(req.body.password!==req.body.cpassword){
            return res.status(409).send({message:"Password doesn't match"});
        }
        await new User(req.body).save();
        res.send('Registration Successful')
    }
    catch(error){
        return res.status(400).json(error);

    }
});

module.exports=router;