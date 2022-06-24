const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ContactInfo = require("../model/ContactInfo");
const urlencoderParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "ejs");

app.get("/login/admin/contactinfo", (req, res) => {
  res.render("contactinfo");
});

app.post("/login/admin/contactinfo", urlencoderParser, (req, res) => {
  const location = req.body.location;
  const phonenumber = req.body.phonenumber;
  const github_link = req.body.github_link;
  const facebook_link = req.body.facebook_link;
  const twitter_link = req.body.twitter_link;
  const linkedin_link = req.body.linkedin_link;
  const instagram_link = req.body.linkedin_link;
  const pinterest_link = req.body.pinterest_link;

  const contactinfodata = new ContactInfo({
    location: location,
    phonenumber: phonenumber,
    github_link: github_link,
    facebook_link: facebook_link,
    twitter_link: twitter_link,
    linkedin_link: linkedin_link,
    instagram_link: instagram_link,
    pinterest_link: pinterest_link,
  });
  contactinfodata.save();
  res.redirect("/login/admin");
  console.log(contactinfodata);
});

module.exports = app;
