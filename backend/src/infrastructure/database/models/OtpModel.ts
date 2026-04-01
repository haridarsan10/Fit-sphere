import mongoose, { Schema } from "mongoose";

const OtpSchema=new Schema({
  ownerId:{
    type:String,required:true
  },
  code:{
    type:String,required:true
  },
  expiresAt:{
    type:Date,required:true
  }
})

const Otp=mongoose.model("Otp",OtpSchema)

export default Otp;