const mongoose=require("mongoose");
const {Schema,model}=mongoose;

const PostSchema = new Schema({
    username:{type:String , required:true},
    date:{type:Date ,default:Date.now()},
    description:{type:String , required:true},
})

const Post= model("Post",PostSchema);
module.exports= Post;
//