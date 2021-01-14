const { Schema, model } = require("mongoose");

const patentSchema = new Schema(
  {
    documentID: String,
  },
  { collection: "Patents" }
);

module.exports = model("Patents", patentSchema);
