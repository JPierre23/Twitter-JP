require("dotenv").config()

// Models 
const User = require("./User");
const Post = require("./Post");
const Media=require("./Media");

// Configs
const PORT = process.env.PORT||3001
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const morgan = require("morgan")


// DB Setup
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("open", () => console.log("The Mongo Connection is Open"))
.on("close", () => console.log("The Mongo Connection is Closed"))
.on("error", (err) => console.log(err));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("static"))
app.use(cors());
app.use(morgan('dev'))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
    res.send("hello world")
  })

  //User
  app.get("/user", async(req,res)=>{
    try{
     res.json(await User.find({}))
    }catch{err=>console.log(err)}
  })
  app.get("/user/:id", async(req,res)=>{
    try{
      res.json(await User.findByIdAndUpdate(req.params.id))
    }catch{err=>console.log(err)}
  })
  app.post("/user", async(req,res)=>{
    try{
      res.json(await User.create(req.body))
    }catch{err=>console.log(err)}
  })
  app.delete("/user/:id",async(req,res)=>{
    try{
      res.json(await User.findByIdAndDelete(req.params.id))
    }catch{err=>console.log(err)}
  })

  app.put("/user/:id",async(req,res)=>{
    try{
      res.json(await User.findByIdAndUpdate(req.params.id,req.body,{new:true}))
    }catch{err=>console.log(err)}
  })

  //Posts  
  app.get("/post", async(req,res)=>{
    try{
      res.json(await Post.find({}))
    }catch{err=>console.log(err)}
  })
  app.get("/post/:id", async(req,res)=>{
    try{
     res.json(await Post.findByIdAndUpdate(req.params.id))
    }catch{err=>console.log(err)}
  })
  app.post("/post", async(req,res)=>{
    try{
      res.json(await Post.create(req.body))
    }catch{err=>console.log(err)}
  })
  app.delete("/post/:id",async(req,res)=>{
    try{
     res.json(await Post.findByIdAndDelete(req.params.id))
    }catch{err=>console.log(err)}
  })

  app.put("/post/:id",async(req,res)=>{
    try{
      res.json(await Post.findByIdAndUpdate(req.params.id,req.body,{new:true}))
    }catch{err=>console.log(err)}
  })

  //Comments
  app.get("/comment/:id", async(req,res)=>{
    try{
      res.json(await Comment.findByIdAndUpdate(req.params.id))
    }catch{err=>console.log(err)}
  })
  app.post("/comment", async(req,res)=>{
    try{
      res.json(await Comment.create(req.body))
    }catch{err=>console.log(err)}
  })
  app.delete("/comment/:id",async(req,res)=>{
    try{
      res.json(await Comment.findByIdAndDelete(req.params.id))
    }catch{err=>console.log(err)}
  })

  app.put("/comment/:id",async(req,res)=>{
    try{
      res.json(await Comment.findByIdAndUpdate(req.params.id,req.body,{new:true}))
      }catch{err=>console.log(err)}
  })

  //Media
  app.get("/media/:id", async(req,res)=>{
    try{
      res.json(await Media.findByIdAndUpdate(req.params.id))
  }catch{err=>console.log(err)}
})
  app.post("/media", async(req,res)=>{
    try{
      res.json(await Media.create(req.body))
    }catch{err=>console.log(err)}
  })
  app.delete("/media/:id",async(req,res)=>{
    try{
      res.json(await Media.findByIdAndDelete(req.params.id))
    }catch{err=>console.log(err)}
  })

  app.put("/media/:id",async(req,res)=>{
    try{
      res.json(await Media.findByIdAndUpdate(req.params.id,req.body,{new:true}))
    }catch{err=>console.log(err)}
  })

app.listen(PORT, () => console.log(`listening on PORT ${PORT}.`)); 