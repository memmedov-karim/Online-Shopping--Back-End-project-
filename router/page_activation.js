const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const flash = require('connect-flash');
const bodyParser = require("body-parser");
const axios = require("axios");
const Product = require("../model/Product");
const ContactInfo = require("../model/ContactInfo");
const { application } = require("express");
const app = express();
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));
const urlencoderParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.get("/", (req, res) => {

  res.render("index",{page:req.url});
});
app.get("/about", (req, res) => {
  ContactInfo.find({}, (err, data) => {
    res.render("about", { data: data[data.length - 1],page:req.url });
  });
});
app.get("/blog_list", (req, res) => {
  ContactInfo.find({}, (err, data) => {
    res.render("blog_list", { data: data[data.length - 1],page:req.url });
  });
});
app.get("/contact", (req, res) => {
  
  ContactInfo.find({}, (err, data) => {
    res.render("contact", { data: data[data.length - 1],page:req.url });
  });
});
app.get("/product", (req, res) => {
  ContactInfo.find({}, (err, data) => {
    console.log(req.url)
    res.render("product", { data: data[data.length - 1],page:req.url });
  });
});
app.get("/testimonial", (req, res) => {
  ContactInfo.find({}, (err, data) => {
    res.render("testimonial", { data: data[data.length - 1],page:req.url });
  });
});

module.exports = app;
