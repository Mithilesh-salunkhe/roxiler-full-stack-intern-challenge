import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        maxLength: 400,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength: 100,
    },
    role: {
        type: String,
        enum: ['admin', 'normal', 'store_owner'],
        default: 'normal',
        required: true,
    }, 
});

export default mongoose.model("User" , userSchema);