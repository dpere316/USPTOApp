const express = require('express');
const router = express.Router();

// This is the model of the patents

const Patent = require('../models/patent_model');

// This is the route to retrive the patents from the mongoDB database 

router.get('/', async function(req, res, next) {
    try{
      
       const patents = await Patent.aggregate([{$sample: {size: 1}}]); // returns a random document from MongoDB
       res.json(patents);
    }
    catch(err){
        res.json({message:err})
    }
  });

module.exports = router;


