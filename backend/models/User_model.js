const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: { type:String,required:true},
    email: { type:String, required:true},
    password: { type:String, required:true},
    role:{type:String,required:true, default:'annotator'}
    
})

module.exports = model("User",UserSchema);