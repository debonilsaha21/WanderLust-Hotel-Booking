const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
});
//username and password are already created by passport if not passed

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);// creating the model and exporting it.



