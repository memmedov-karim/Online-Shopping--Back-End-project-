const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");
const mongoDbURL =
  "mongodb+srv://kerim:20012912Ms@cluster0.pcmjq.mongodb.net/my_product?retryWrites=true&w=majority";
mongoose
  .connect(mongoDbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connect database");
  })
  .catch((err) => {
    console.log("unsucces", err);
  });
const adminRoute = require("./router/adding_product");
const pageRouting = require("./router/page_activation");
const user_infoRouting = require("./router/user_info");
const contactRouting = require("./router/contact_info");
const user_accountRouting = require("./router/user_account");
app.use(adminRoute);
app.use(pageRouting);
app.use(user_infoRouting);
app.use(contactRouting);
app.use(user_accountRouting);
app.listen(7000);
