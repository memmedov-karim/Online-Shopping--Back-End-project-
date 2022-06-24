const express = require("express");
const alert = require("alert");
const multer = require("multer");
const nodemailer = require("nodemailer");
const UserSignUp = require("../model/UserSignUp");
const UserBankCard = require("../model/UserBankCard");
const bodyParser = require("body-parser");
const axios = require("axios");
const ObjectId = require("mongodb");
const mongoose = require("mongoose");
const Product = require("../model/Product");
const InfoFromUser = require("../model/InfoFromUser");
const UserOrder = require("../model/UserOrder");
const { application } = require("express");
const app = express();
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));
const urlencoderParser = bodyParser.urlencoded({ extended: false });
app.set("view engine", "ejs");



// ------------------------------------------------------------------------------
// Creat transporter for to send mail to user
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "shikhkarim.express@gmail.com",
    pass: "afmqihmygsowmpvv",
  },
});
// Creat transporter for to send mail to user end here
// ------------------------------------------------------------------------------









// ------------------------------------------------------------------------------------
// User send info from contact page
app.get("/login/admin/fromuserdata", (req, res) => {
  InfoFromUser.find({}, (err, data) => {
    if (err) throw err;

    res.render("fromuserdata", { user_data: data });
  });
});
app.get("/login/admin/fromuserdata/delete/:id", (req, res) => {
  const id = req.params.id;
  InfoFromUser.findById(id, (err, data) => {
    if (err) throw err;
    data.remove();
    res.redirect("/login/admin/fromuserdata");
  });
});
app.get("/login/admin/fromuserdata/sendmail/:id", (req, res) => {
  res.render("sendmail");
});
app.post("/login/admin/fromuserdata/sendmail/:id", urlencoderParser, (req, res) => {
  const id = req.params.id;
  InfoFromUser.findById(id, (err, data) => {
    if (err) throw err;

    let mailoptions = {
      from: "sixkerimmemmedov2001@gmail.com",
      to: data.email,
      subject: "answer",
      text: req.body.msg,
    };
    transporter.sendMail(mailoptions, (err, data) => {
      if (err) throw err;
      res.redirect("/login/admin/fromuserdata");
      console.log("message has been sent succesfully");
    });
    console.log(data);
  });
});

app.post("/login/admin/fromuserdata", urlencoderParser, (req, res) => {
  const search = req.body.search;
  useronedata = {};
  let userChecker = false;
  InfoFromUser.find({}, (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      if (search == data[i].email) {
        userChecker = true;
        useronedata = { ...data[i] };
      }
    }
    if (userChecker) {
      console.log("succes");
      res.render("useronedata", { useronedata: useronedata._doc });
    } else {
      alert("There is not information from this user");
      res.redirect("/login/admin/fromuserdata");
      console.log("fail");
    }
  });
});
// User send info from contact page End here
// ------------------------------------------------------------------------------------






// -----------------------------------------------------------------------------
// User order products
app.get("/login/admin/userorders", (req, res) => {
  UserOrder.find({}, (err, data) => {
    if (err) throw err;
    res.render("userorders", { data: data });
  });
});
app.post("/login/admin/userorders",urlencoderParser,(req,res)=>{
  const searching_email = req.body.search;
  let my_obj = {};
  let my_obj_data = [];
  let checker = false;

  UserOrder.find({},(err,data)=>{
    if(err) throw err;
    for(let i = 0;i<data.length;i++){
      if(data[i].email == searching_email){
        checker = true;
        my_obj = {...data[i]};
        my_obj_data.push(my_obj);
      }
      else{
        continue;
      }
    }
    if(checker){
      console.log("This orders are found):");
      res.render('searching_result_orders',{data:my_obj_data});
      for(let item of my_obj_data){
        console.log(item._doc);
      }
    }
    else{
      alert("There is not orders for this email");
      console.log("There is not orders");
      res.redirect('/login/admin/userorders');
    }
  });

});
app.get("/login/admin/userorders/send/:id", (req, res) => {
  res.render("sendorderinfo");
});
app.post("/login/admin/userorders/send/:id", urlencoderParser, (req, res) => {
  const order_id = req.params.id;
  UserOrder.findById(order_id, (err, data) => {
    let mailoptions = {
      from: "shikhkarim.express@gmail.com",
      to: data.email,
      subject: "answer",
      text: req.body.msg,
    };
    transporter.sendMail(mailoptions, (err, data) => {
      if (err) throw err;
      res.redirect("/login/admin/fromuserdata");
      console.log("message has been sent succesfully");
    });
  });
});
app.get("/user_sign/user_account/order/:id/:id", (req, res) => {
  const page_third_part = req.url.split("/")[3]
  const my_url = req.url;
  const user_id = my_url.split("/")[4];
  console.log(user_id);
  Product.findById(req.params.id, (err, data) => {
    if (err) throw err;
    UserSignUp.findById(user_id, (err, data3) => {
      if (err) throw err;
      res.render("order_product", {
        data: data,
        data2: data3,
        page:page_third_part
      });
    });
  });
});
app.post(
  "/user_sign/user_account/order/:id/:id",
  urlencoderParser,
  (req, res) => {
    const number = req.body.number;
    const quantity = req.body.quantity;
    const message = req.body.message;
    const my_url = req.url;
    const user_id = my_url.split("/")[4];
    const my_product_id = my_url.split("/")[5];
    UserSignUp.findById(user_id, (err, user_data) => {
      if (err) throw err;
      const username = user_data.firstname;
      const email = user_data.email;

      Product.findById(my_product_id, (err, product_data) => {
        if (err) throw err;
        const product = product_data.name;
        const price = product_data.price;
        let my_original_price = "";
        for (let item of price) {
          if (!isNaN(item)) {
            my_original_price += item;
          }
        }
        const total_price = Number(my_original_price) * quantity;
        const neworderdata = new UserOrder({
          username: username,
          email: email,
          contact_number: number,
          product: product,
          quantity: quantity,
          total_price: total_price,
          message: message,
        });
        neworderdata.save();
        res.redirect(`/user_sign/user_account/${user_id}`);
      });
    });
  }
);
// User order product end here
// ------------------------------------------------------------------------------



// ------------------------------------------------------------------------------
// Signing User info 
app.get("/login/admin/signinguserinfo", (req, res) => {
  UserSignUp.find({}, (err, data) => {
    if (err) throw err;
    res.render("signinguserinfo", { user_data: data });
  });
});
app.get("/login/admin/signinguserinfo/delete/:id", (req, res) => {
  const user_id = req.params.id;
  UserSignUp.findById(user_id, (err, data) => {
    data.remove();
    res.redirect("/login/admin/signinguserinfo");
  });
});
app.get("/login/admin/signinguserinfo/edit/:id", (req, res) => {
  const user_id = req.params.id;
  UserSignUp.findById(user_id, (err, data) => {
    if (err) throw err;
    res.render("edtsgndtl", { data: data });
  });
});
app.post("/login/admin/signinguserinfo/edit/:id", urlencoderParser, (req, res) => {
  console.log(req.body);
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  UserSignUp.findOneAndUpdate(
    id,
    {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    },
    (err, data) => {
      if (err) throw err;
      res.redirect("/login/admin/signinguserinfo");
    }
  );
});



app.post("/login/admin/signinguserinfo", urlencoderParser, (req, res) => {
  const searching_email = req.body.search;

  let onedata = {};
  let checkermail = false;
  UserSignUp.find({}, (err, data) => {
    if (err) throw err;

    for (let i = 0; i < data.length; i++) {
      if (data[i].email == searching_email) {
        checkermail = true;
        onedata = { ...data[i] };
      }
    }
    if (checkermail) {
      res.render("useronesigninfo", { data: onedata._doc });
    } else {
      res.redirect("/login/admin/signinguserinfo");
      console.log("There is not user with this email!");
      alert("There is not user with this email!");
    }
  });
});
// Signing User info end here
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Login to Admin Page
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", urlencoderParser, (req, res) => {
  const email = req.body.email;
  const pswd = req.body.pswd;
  if (email == "sixkerimmemmedov2001@gmail.com" && pswd == "20012912Ms") {
    res.redirect("/login/admin");
  } else {
    alert("Email or password is Incorrect");
    res.redirect("/login");
  }
});
// Login to Admin Page end here
// ---------------------------------------------------------------------------





// ---------------------------------------------------------------------------
// Adding Bank Card
app.get('/user_sign/user_account/addtocart/:id',(req,res)=>{
  res.render('AddToCard')
});
app.post('/user_sign/user_account/addtocart/:id',urlencoderParser,(req,res)=>{

  const user_id = req.params.id;
  const owner = req.body.owner;
  const cvv = req.body.cvv;
  const cardNumber = req.body.cardNumber;
  const exp_month = req.body.exp_month;
  let month_object = {
    "01":"January",
    "02":"February",
    "03":"March",
    "04":"April",
    "05":"May",
    "06":"June",
    "07":"Luly",
    "08":"August",
    "09":"September",
    "10":"October",
    "11":"November",
    "12":"December"
  };
  const month_date = month_object[exp_month];
  const exp_year = req.body.exp_year;
  const year_date = "20"+exp_year;
  const GeneralDate = month_date+","+year_date;
  console.log(req.body)
  UserSignUp.findById(user_id,(err,user_data)=>{
    if(err) throw err;
    const name = user_data.firstname;
    const email = user_data.email;
    console.log(user_data)

    const newbankcard  = new UserBankCard({
      name:name,
      email:email,
      name_on_card:owner,
      cvv:cvv,
      card_number:cardNumber,
      Expiration_Date:GeneralDate,

    });
    let CardChecker = false;
    UserBankCard.find({},(err,data)=>{
      if(err) throw err;
      for(let item=0;item<data.length;item++){
        console.log(data[item].card_number)
        if(data[item].card_number == req.body.cardNumber){
          CardChecker = true;
          break;
        }

      }
      if(CardChecker){
        console.log("This card are registered please use another card");
        alert("This card are registered please use another card");
        res.redirect(`/user_sign/user_account/addtocart/${user_id}`);
      }
      else{
        newbankcard.save();
        console.log("Your card added succesfully):");
        res.redirect(`/user_sign/user_account/${user_id}`);
  
      }

    });
    
    

  });

});
// Adding Bank Card end here
// ------------------------------------------------------------------------------




// ------------------------------------------------------------------------------
// Adding Product from Admin Panel
const uploadMidleVare = multer({
  fileFilter: (req, file, cb) => {
    cb(undefined, true);
  },
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
  }),
});
app.get("/login/admin", (req, res) => {
  Product.find({}, (err, data) => {
    if (err) throw err;
    res.render("admin", { data: data });
  });
});
app.get("/login/admin/delete/:id", (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, data) => {
    if (err) throw err;
    data.remove();
    res.redirect("/login/admin");
  });
});
app.get("/login/admin/edit/:id", (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) throw err;
    res.render("edit", { edit_data: data });
  });
});

app.post(
  "/login/admin/edit/:id",
  urlencoderParser,
  uploadMidleVare.single("file"),
  (req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const file = req.file.path;
    Product.findOneAndUpdate(
      req.params.id,
      {
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        file: file,
      },
      (err, data) => {
        if (err) throw err;
        res.redirect("/login/admin");
      }
    );
  }
);
app.post(
  "/login/admin",
  urlencoderParser,
  uploadMidleVare.single("file"),
  (req, res) => {
    console.log(req.query);
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const file = req.file.path;

    const newdata = new Product({
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      file: file,
    });
    newdata.save();
    res.redirect("/login/admin");
  }
);
// Adding product from Admin panel 
// ------------------------------------------------------------------------------------
module.exports = app;
