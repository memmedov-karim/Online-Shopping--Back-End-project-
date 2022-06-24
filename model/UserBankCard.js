const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userbankcardschema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    name_on_card:{
        type:String
    },
    cvv:{
        type:Number
    },
    card_number:{
        type:String
    },
    Expiration_Date:{
        type:String
    },


},{timestamps:true});

const UserBankCard = mongoose.model('UserBankCard',userbankcardschema);

module.exports = UserBankCard;