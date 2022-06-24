const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserInfo = new Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
},{timestamps:true});
const InfoFromUser = mongoose.model("InfoFromUser",UserInfo);
module.exports = InfoFromUser;
