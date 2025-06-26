
import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
     content : {
        type : String,
        required : true
     },
     postId : {
        type : String,
        required : true
     },
     userId : {
        type : String,
        required : true
     },
     likes : {
        type : Array,
        default : []
     },
}, {timestamps : true});


const Comment = mongoose.model("comment", commentSchema);

export default Comment