const { Schema, model } = require("mongoose");

const patentSchema = new Schema(
  
  {
    
  },

  { collection: "Patents" }
);

module.exports = model("Patents", patentSchema);
