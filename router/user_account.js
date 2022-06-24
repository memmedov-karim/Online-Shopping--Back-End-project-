const express = require("express");
const UserSignUp = require("../model/UserSignUp");
const InfoFromUser = require("../model/InfoFromUser");
const Product = require("../model/Product")
const ContactInfo = require("../model/ContactInfo");
const ObjectId = require("objectid");
const bodyParser = require("body-parser");
const urlencoderParser = bodyParser.urlencoded({ extended: false });
const alert = require("alert");
const app = express();
app.get("/user_sign", (req, res) => {
  res.render("user_sign");
});

app.get("/user_sign/user_account/:id", (req, res) => {
  const page_third_part = req.url.split("/")[2]
  console.log(page_third_part)
  UserSignUp.findById(req.params.id, (err, data3) => {
    if (err) throw err;
    ContactInfo.find({}, (err, data) => {
      if (err) throw err;
      const data1 = data[data.length - 1];
      Product.find({},(err,data_product)=>{
        if(err) throw err;
        res.render("user_account", {
          data2: data3,
          page: page_third_part,
          data: data1,
          data_product:data_product,
        });

      })
      
    });
  });
app.get('/user_sign/user_account/product/:id',(req,res)=>{
  const page_third_part = req.url.split("/")[3]
  console.log(page_third_part)
  UserSignUp.findById(req.params.id, (err, data3) => {
    if (err) throw err;
    ContactInfo.find({}, (err, data) => {
      if (err) throw err;
      const data1 = data[data.length - 1];
      Product.find({},(err,data_product)=>{
        if(err) throw err;
        res.render("user_product", {
          data2: data3,
          page: page_third_part,
          data: data1,
          data_product:data_product,
        });

      })
      
    });
  });
});
app.post('/user_sign/user_account/product/:id',urlencoderParser,(req,res)=>{
  const page_third_part = req.url.split("/")[3]
  const category_name = req.body.searching;
  console.log(req.params.id)
  console.log(req.body)
  UserSignUp.findById(req.params.id,(err,data3)=>{
    if(err) throw err;
    ContactInfo.find({},(err,data)=>{
      if(err) throw err;
      const data1 = data[data.length - 1];
      let checker = false;
      let my_obj = {};
      let my_obj_data = [];
      Product.find({},(err,data_product)=>{
        for(let i=0;i<data_product.length;i++){
          if(data_product[i].category == category_name){
            checker = true;
            my_obj = {...data_product[i]};
            my_obj_data.push(my_obj._doc);
          }
        }
        console.log(my_obj_data);
        
        if(checker){
          res.render('searching_category_name',
        {
          data2: data3,
          page: page_third_part,
          data: data1,
          data_product:my_obj_data,
          checker:checker


        }
        )

        }
        else{
          res.render('searching_category_name',
          {
          data2: data3,
          page: page_third_part,
          data: data1,
          data_product:my_obj_data,
          checker:checker
          }
          )

        }
      })


    })
  })

})
app.get('/user_sign/user_account/contact/:id',(req,res)=>{
  
  const page_third_part = req.url.split("/")[3]
  console.log(page_third_part)
  UserSignUp.findById(req.params.id, (err, data3) => {
    if (err) throw err;
    ContactInfo.find({}, (err, data) => {
      if (err) throw err;
      const data1 = data[data.length - 1];
      Product.find({},(err,data_product)=>{
        if(err) throw err;
        res.render("user_contact", {
          data2: data3,
          page: page_third_part,
          data: data1,
          data_product:data_product,
        });

      })
      
    });
  });
});
app.post("/user_sign/user_account/contact/:id", urlencoderParser, (req, res) => {
  const page_third_part = req.url.split("/")[3]
  console.log(page_third_part)
  const fullname = req.body.fullname;
  const subject = req.body.subject;
  const message = req.body.message;
  UserSignUp.findById(req.params.id,(err,data)=>{
    if(err) throw err;
    const email = data.email;
    const newuserdata = new InfoFromUser({
      fullname: fullname,
      email: email,
      subject: subject,
      message: message,
    });
    newuserdata.save();
    alert("Form has been sent succesfuly!");
    
    res.redirect(`/user_sign/user_account/contact/${req.params.id}`);
  })
  
});
app.get('/user_sign/user_account/blog/:id',(req,res)=>{
  const page_third_part = req.url.split("/")[3]
  console.log(page_third_part)
  UserSignUp.findById(req.params.id, (err, data3) => {
    if (err) throw err;
    ContactInfo.find({}, (err, data) => {
      if (err) throw err;
      const data1 = data[data.length - 1];
      Product.find({},(err,data_product)=>{
        if(err) throw err;
        res.render("user_blog_list", {
          data2: data3,
          page: page_third_part,
          data: data1,
          data_product:data_product,
        });

      })
      
    });
  });
});
  app.get("/user_account/about_user/:id", (req, res) => {
  const page_third_part = req.url.split("/")[3]
  console.log(page_third_part)
  UserSignUp.findById(req.params.id, (err, data3) => {
    if (err) throw err;
    ContactInfo.find({}, (err, data) => {
      if (err) throw err;
      const data1 = data[data.length - 1];
      Product.find({},(err,data_product)=>{
        if(err) throw err;
        res.render("about_user", {
          data2: data3,
          page: page_third_part,
          data: data1,
          data_product:data_product,
        });

      })
      
    });
  });
  });
});
// app.get('/user_account/about_user/edit/:id',(req,res)=>{
  
//   const page_third_part = req.url.split("/")[3]
//   console.log(page_third_part)
//   UserSignUp.findById(req.params.id, (err, data3) => {
//     if (err) throw err;
//     ContactInfo.find({}, (err, data) => {
//       if (err) throw err;
//       const data1 = data[data.length - 1];
//       Product.find({},(err,data_product)=>{
//         if(err) throw err;
//         res.render("edit_about_user", {
//           data2: data3,
//           page: page_third_part,
//           data: data1,
//           data_product:data_product,
//         });

//       })
      
//     });
//   });

  
// })
// app.post('/user_account/about_user/edit/:id',urlencoderParser,(req,res)=>{
//   console.log(req.params.id)
  
  
//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   const email = req.body.email;
//   UserSignUp.findOneAndUpdate(req.params.id,
//     {
//       _id:ObjectId(req.params.id),
//       firstname:firstname,
//       lastname:lastname,
//       email:email,
//     },
//     (err,data)=>{
//     if(err) throw err;
//     console.log(data)
//     res.redirect(`/user_account/about_user/${req.params.id}`)
//   })

// })

app.post("/user_sign", urlencoderParser, (req, res) => {

  const check = Object.keys(req.body).length;
  if (check == 4) {
    

   
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
   
    const usersigndata = new UserSignUp({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    let MailChecker = false;
    UserSignUp.find({}, (err, data) => {
      if (err) throw err;
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i].email)
        if (data[i].email == req.body.email) {
          MailChecker = true;
          break;
        }
      }
      if (MailChecker) {
        alert("There is a user with this email,Please use another email!");
        console.log("There is a user with this email");
      } else {

        alert("You  registered succesfully ");
        usersigndata.save();
      }
    });

    res.redirect("/user_sign");
  } else if (check == 2) {
    const email = req.body.email;
    const password = req.body.password;
    let checker = false;
    my_obj = {};
    UserSignUp.find({}, (err, data) => {
      if (err) throw err;
      for (let i = 0; i < data.length; i++) {
        if (data[i].email == email) {
          checker = true;
          my_obj = { ...data[i] };
        }
      }
      if (checker) {
        console.log(my_obj._doc);
        const user_id = my_obj._doc._id;
        UserSignUp.findById(user_id, (err, data) => {
          if (err) throw err;
          if (data.password == password) {
            console.log("succes");

            res.redirect(`/user_sign/user_account/${user_id}`);
          } else {
            res.redirect('/user_sign');
            alert("password is incorrect");
            console.log("password is incorrect");
          }
        });
      } else {
        res.redirect('/user_sign');
        alert("There is not user with this email");
        console.log("There is not user with this email");
      }
    });
  }
});

module.exports = app;
