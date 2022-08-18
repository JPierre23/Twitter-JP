require("dotenv").config()

// Models 
const User = require("./model/User");
const Post = require("./model/Post");
const Media=require("./model/Media");

// Configs
const PORT = process.env.PORT||3001
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bcrypt = require('bcrypt')
const session=require('cookie-session')
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));
app.use(cors());
app.use(morgan('dev'))
app.use(
  session({
    "name":"session",
    "secret":process.env.ACCESS_TOKEN_SECRET,
    "expires":new Date(Date.now() + 24 * 60 * 60 * 1000)
  })
);

const UserRouter = require("./controller/User");
app.use("/user", UserRouter);
app.options('*', cors())

app.get("/", (req,res) =>{
  if(req.session.loggedIn){
      res.render("userprofile.ejs",{currentUser:req.session.user})
  }else{
      res.render("login.ejs");
  }
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
     res.render("edit.ejs",{})
    }catch{err=>console.log(err)}
  })
  app.get("/newpost", async(req,res)=>{
    try{
      res.render("new.ejs")
    }catch{err=>console.log(err)}
  })
  app.post("/post", async(req,res)=>{
    try{
      await Post.create(req.body)
      res.redirect("/user/profile")
    }catch{err=>console.log(err)}
  })
  app.delete("/post/:id",async(req,res)=>{
    try{
     res.redirect("/user/profile")
    }catch{err=>console.log(err)}
  })
  app.get("/editpost/:id",(req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        console.log(post);
        res.render("edit.ejs",{index:req.params.id,post});
    });
  })
  app.put("/post/:id",async(req,res)=>{
    try{
      await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
      res.redirect("/user/profile")
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

/* 
const {user,pwd} = req.body
    if(!user || !pwd) return (res.status(400).json({'message':'Username and password are required.'}))
    const duplicate= usersDB.find(person => person.username === user)
    if(duplicate) return res.sendStatus(409);
    try{
        const hashedPwd =await bcrypt.hash(pwd, 10) //salt and hash
        // require('crypto').randomeBytes(64).toString('hex')
        const newUser ={"username":user, "password":hashedPwd}
        res.json(await User.create(newUser))
        

    }catch(err){
        res.status(500).json({'message':err.message})
    }
*/