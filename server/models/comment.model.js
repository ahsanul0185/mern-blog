
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
     parentCommentId : {
        type : String,
        default : null
     },
     likes : {
        type : Array,
        default : []
     },
     replies : {
        type : Array,
        default : []
     },
}, {timestamps : true});


const Comment = mongoose.model("comment", commentSchema);

export default Comment