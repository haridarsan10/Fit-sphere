import mongoose, { Schema } from "mongoose";

const GymOwnerSchema=new Schema({
  firstname:{
    type:String,required:true
  },
  lastname:{
    type:String,required:true
  },
  email:{
    type:String,required:true,unique:true
  },
  password:{
    type:String,required:true
  },
  phoneNumber:{
    type:String,required:true,unique:true
  },
  status:{
    type:String,enum:["PENDING", "ACTIVE","APPROVED"],default:"PENDING"
  }
}) 

const GymOwner=mongoose.model("GymOwner",GymOwnerSchema)

export default GymOwner