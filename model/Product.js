const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productshema = new Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String
        
    },
    price:{
        type:String,
        required:true,

    },
    quantity:{
        type:Number,
        required:true
    },
    file:{
        type:String,
        required:true
    }
},{timestamps:true});

const Product = mongoose.model('Product',productshema);
module.exports = Product;