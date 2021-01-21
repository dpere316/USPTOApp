const { Schema, model } = require("mongoose");

const labelSchema = new Schema(
  
  {
    document:{ type:String},
    MachineLearningPatent:{type:String},
    ActiveLearningPatent:{type:String},
  },

);

module.exports = model("Label", labelSchema);
