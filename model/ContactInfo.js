const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactinfo = new Schema({
    location:{
        type:String,
        require:true,
    },
    phonenumber:{
        type:String,
        require:true,
    },
    github_link:{
        type:String,
        
    },
    facebook_link:{
        type:String,
        
    },
    twitter_link:{
        type:String,
    },
    linkedin_link:{
        type:String,
    },
    instagram_link:{
        type:String,
    },
    pinterest_link:{
        type:String,
    },

});
const ContactInfo = mongoose.model("ContactInfo",contactinfo);
module.exports = ContactInfo;