import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : String,
        default : "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    },
    isVerfied : {
        type : Boolean,
        default : false
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    resetPasswordToken : String,
    resetPasswordTokenExpiresAt : Date
    
}, {timestamps : true});


const User = mongoose.model('user', userSchema);

export default User; 