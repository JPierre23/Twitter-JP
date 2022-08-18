const mongoose=require("mongoose");
const {Schema,model}=mongoose;

const PostSchema = new Schema({
    user:{type:String , required:true},
    date:{type:Date ,default:Date.now()},
    description:{type:String , required:true},
})

const Post= model("Post",PostSchema);
module.exports= Post;
//