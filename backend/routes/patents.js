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

// This route is sending a post to the DB with labeling information aswell as document id
// Need to send userid

router.post("/labels", async function (req, res, next) {
  const label = new Label({
    user:req.user._id,
    document: req.body.documentId,
    MachineLearningPatent: req.body.MachineLearningPatent,
    Hardware:req.body.Hardware,
    EVO:req.body.EVO,
    Speech:req.body.Speech,
    Vision:req.body.Vision,
    NLP:req.body.NLP,
    Planning:req.body.Planning,
    KnowledgeProcessing:req.body.KnowledgeProcessing,
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

module.exports = router;
