const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userorderdata = new Schema({

    username:{
        type:String
    },
    email:{
        type:String

    },
    contact_number:{
        type:String
    },
    product:{
        type:String
    },
    quantity:{
        type:Number
    },
    
    total_price:{
        type:String
    },
    message:{
        type:String
    },
    




},{timestamps:true});

const UserOrder = mongoose.model("UserOrder",userorderdata);
module.exports = UserOrder;
