const { Schema, model } = require("mongoose");

const labelSchema = new Schema(
  
  {
    user:{ type: Schema.Types.ObjectId, ref: "User"},
    document:{ type:String},
    MachineLearningPatent:{type:String},
    Hardware:{type:String},
    EVO:{type:String},
    Speech:{type:String},
    Vision:{type:String},
    NLP:{type:String},
    Planning:{type:String},
    KnowledgeProcessing:{type:String},
  },

);

module.exports = model("Label", labelSchema);

