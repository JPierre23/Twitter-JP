const mongoose=require("mongoose");
const {Schema,model}=mongoose;

const CommentSchema = new Schema({
    username:{type:String , required:true},
    date:{type:Date ,default:Date.now()},
    description:{type:String , required:true},
    post_id:{type:String , required:true},
})

const Comment= model("Comment",CommentSchema);
module.exports= Comment;
//