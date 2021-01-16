const { Schema, model } = require("mongoose");

const UserSchema = new moongoose.schema({
    name: { type:String, required:True},
    email: { type:String, required:True},
    password: { type:String, required:True},
    date: { type:Date, Default:Date.now}
})

const User = moongoose.model('User',UserSchema);

module.exports = User;