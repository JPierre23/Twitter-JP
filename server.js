require("dotenv").config()

// Models 


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

app.get("/", (req, res) => {
    res.send("hello world")
  })
  
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`)); 