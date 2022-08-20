const { render } = require("ejs");
const express= require("express");
const User=require("../model/User")
const bcrypt= require("bcrypt");
const router= express.Router();
const mongoose = require("mongoose");
const Post = require("../model/Post");
const Media = require("../model/Media");

//signup page  - get --> goes to signup page
router.get("/signup", (req,res) =>{
    res.render("signup.ejs");
  })
  
  //sign up user - post --> collects data from user and stores in db
  router.post("/signup", async (req,res) => {
    try{
    await User.create(req.body)
    }catch (err) {console.log(err)}
    res.redirect("/user/login")
    //capture password hash it
    //store user data in db
    //redirect to login
  
  
  })
//log in page route - get --> takes us to login page
router.get("/login", (req,res) =>{
    res.render("login.ejs");
  })
  
  //log in send user data to server - post
  router.post("/login", (req,res) =>{
    const {user,pwd} = req.body;
    console.log(user)
    try{
    User.find({user},async (err,person)=>{       
        const data = await person;
        if(err || !data || data==null) res.redirect("/user/login");
        console.log(data)
        const passwordMatches = pwd===data.pwd ? true:false ;
       
        if(!passwordMatches) res.redirect("/");
        req.session.loggedIn= true;
        req.session.user=user;
        res.redirect("/")
    })
    res.redirect("/")
  }catch(err){
    console.log(err)
   
  }
  })
  

  router.get("/profile", async(req,res) =>{
    
    if (!req.session.loggedIn) res.redirect('/user/login')

    let data={}
    const media= await Media.find({"user":req.session.user})
    Post.find({"user":req.session.user},async (err,allPosts)=>{
      
      console.log(allPosts)
      console.log(media)
      res.render("userprofile.ejs",{post:allPosts,media})
    })
    
    
  })

  
  //logout
  router.get("/logout", (req,res) =>{
    req.session=null
    res.redirect("/")
  })
  
  module.exports= router;
  
 
  