const mongoose=require("mongoose");
const {Schema,model}=mongoose;

const userSchema =new Schema({
    user:{type:String, required: true},
    pwd:{type:String, required: true},
    email:{type:String, required: true},
})
const User=model("User",userSchema);
module.exports=User;
