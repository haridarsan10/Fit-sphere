import mongoose, { Schema } from "mongoose";

const UserSchema=new Schema({
  firstname:{
    type:String,required:true
  },
  lastname:{
    type:String,required:true
  },
  email:{
    type:String,unique:true,required:true
  },
  password:{
    type:String,required:true
  },
  phonenumber:{
    type:String,required:true,unique:true
  },
  status:{
    type:String,enum:["PENDING", "ACTIVE","APPROVED"],default:"PENDING"
  }
})

const User=mongoose.model('User',UserSchema)

export default User