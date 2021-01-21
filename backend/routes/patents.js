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

router.post("/labels", async function (req, res, next) {
  const label = new Label({
    document: req.body.documentId,
    MachineLearningPatent: req.body.MachineLearningPatent,
    ActiveLearningPatent: req.body.ActiveLearningPatent,
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
