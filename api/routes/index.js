const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const Item= require('../models/Item')
const Buyer =require('../models/Buyer');
router.get('/courses', async function(req, res, next) { 
  let courses=[]
  if(req.query.branch){
    console.log(req.query.branch)
      courses = await Course.find({branch: req.query.branch})
  }else{
      courses = await Course.find()
  }
  res.send(200,courses);
});
router.get('/students', async function(req, res, next) { 
    const courses = await Student.find()
    res.status(200).send(courses);
});

module.exports = router;
