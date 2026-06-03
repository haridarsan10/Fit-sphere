import mongoose, { Schema } from "mongoose";

const AccountSchema=new Schema({
  id:{
    type:String,required:true,unique:true
  },
  firstName:{
    type:String,required:true
  },
  lastName:{
    type:String,required:true
  },
  email:{
    type:String,unique:true,required:true
  },
  password:{
    type:String,required:true
  },
  status:{
    type:String,enum:["PENDING", "ACTIVE","APPROVED"],default:"PENDING"
  },
  role:{
    type:String,enum:['User','Gymowner','Trainer']
  }
})

const AccountModel=mongoose.model('User',AccountSchema)

export default AccountModel