const express = require("express")
const {UserModel} = require("../models/users.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter= express.Router()



userRouter.get("/", async (req, res) => {
    try {
      let data = await UserModel.find();
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });
  
  userRouter.post("/register", async (req, res) => {
    const {email,password,name} = req.body;
    try {
      bcrypt.hash(password, 5,async (err, secured_password)=> {
        // Store hash in your password DB.
        if(err){
          console.log(err);
        }else{
  
          const user = new UserModel({email,password:secured_password,name});
          await user.save();
          res.send("Registered");
        }
    });
    } catch (error) {
      res.send("error in registering the user");
      console.log(error);
    }
  });
  
  userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      
      const user = await UserModel.find({ email });
      console.log(user);    
      const hashed_pass=user[0].password
      if (user.length > 0) {
        bcrypt.compare(password, hashed_pass , (err, result)=> {
          if(result){
          const token = jwt.sign({ userID:user[0]._id}, "masai");
          res.send({ "msg": "Login Successful", "token": token});
        }else{
          res.send("wrong credentials");
        }
        });
  
      } else {
        res.send("wrong credentials");
      }
    } catch (error) {
      res.send("something went wrong");
      console.log(error);
    }
  });
  
  
  
  module.exports={userRouter}