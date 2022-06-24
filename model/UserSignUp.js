const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersigningdata = new Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        reuired:true,
    }
});
const UserSignUp = mongoose.model("UserSignUp",usersigningdata);
module.exports = UserSignUp;