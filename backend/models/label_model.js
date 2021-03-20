const { Schema, model } = require("mongoose");

const labelSchema = new Schema(
  
  {
    user:{ type: Schema.Types.ObjectId, ref: "User"},
    document:{ type:String},
    mal:{type:String},
    hdw:{type:String},
    evo:{type:String},
    spc:{type:String},
    vis:{type:String},
    nlp:{type:String},
    pln:{type:String},
    kpr:{type:String},
  },
  
    {timestamps: true,
    }
  

);

module.exports = model("Label", labelSchema);

