const express = require("express");
const router = express.Router();

// This is the model of the patents
const Patent = require("../models/patent_model");

// Import label model
const Label = require("../models/label_model");

// This is the route to retrive the patents from the mongoDB database

router.get("/", async function (req, res, next) {
  try {
    const patents = await Patent.aggregate([{ $sample: { size: 1 } }]); // returns a random document from MongoDB
    res.json(patents);
  } catch (err) {
    res.json({ message: err });
  }
});

// This route is sending a post to the DB with labeling information aswell as documentid and userid

router.post("/labels", async function (req, res, next) {
  const label = new Label({
    user:req.user._id,
    document: req.body.documentId,
    mal:req.body.mal, // Machine Learning
    hdw:req.body.hdw, // Hardware
    evo:req.body.evo, // Evolution
    spc:req.body.spc, // speech
    vis:req.body.vis, // Vision
    nlp:req.body.nlp, // Natural Language Processing 
    pln:req.body.pln, // Planning 
    kpr:req.body.kpr, // Knowledge Processing
  });
  label
    .save()
    .then((result) => {
      // console.log(result);
      res.status(201).json(result);
    })
    .catch((error) => {
      // console.log(error);
      res.status(500).json({
        error: error,
      });
    });
});

router.get("/labels", async function (req, res, next) {
  try {
    const labels = await Label.find()
    res.json(labels);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
