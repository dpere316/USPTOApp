const express = require("express");
const router = express.Router();

// This is the model of the patents
const Patent = require("../models/patent_model");

// Import label model
const Label = require("../models/label_model");

// Import label model
const User = require("../models/User_model");

// This is the route to retrive the labels from the mongoDB database

router.get("/", async function (req, res, next) {
  try {
    const query = req.body.text; //user_input - list of patentId (object_ids)
    // const patents = await Patent.aggregate([{ $match: { _id: query } }]); // return list of annotations to calculate agreeement
    // calculate agreement here

    // return the agreement
    res.json(patents);
  } catch (err) {
    res.json({ message: err });
  }
});

// This route is sending a post to the DB with labeling information aswell as document id
// Need to send userid

router.post("/adminstats", async function (req, res, next) {
  const query = req.body.text; //user_input - list of patentId (object_ids)
  query
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
