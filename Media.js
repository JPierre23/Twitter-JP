const mongoose=require("mongoose");
const {Schema,model}=mongoose;

const MediaSchema = new Schema({
    username:{type:String , required:true},
    date:{type:Date ,default:Date.now()},
    img:{type:String , required:true},
})

const Media= model("Media",MediaSchema);
module.exports= Media;
//