const express = require("express");
const router = express.Router();
const Policy = require("../models/policyModel")

router.get("/getallpolicies",async(req,res)=>{
    try{
        const policies = await Policy.find()
        res.send(policies)
    }
    catch(error){
        return res.status(400).json(error);
    }
});

router.post("/addpolicy", async (req, res) => {
    try {
      const newpolicy = new Policy(req.body);
      await newpolicy.save();
      res.send("Policy added successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });

router.post("/editpolicy", async (req, res) => {
    try {
      const policy = await Policy.findOne({_id:req.body._id})
      policy.name = req.body.name
      policy.image = req.body.image
      policy.description = req.body.description
      policy.cost = req.body.cost
      policy.rating=req.body.rating
      await policy.save()
      res.send("Policy updated successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });


  router.post("/deletepolicy", async (req, res) => {
    try {
      await Policy.findOneAndDelete({ _id: req.body.policyid });
  
      res.send("Policy deleted successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  
module.exports = router;