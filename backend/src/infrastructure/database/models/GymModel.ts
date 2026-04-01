import mongoose, { Schema } from "mongoose";

const GymSchema=new Schema({
  name:{
    type:String,required:true
  },
  description:{
    type:String,required:true
  },
  address:{
    type:String,required:true
  },
  contact_phone:{
    type:String,required:true
  },
  email:{
    type:String,required:true
  },
  owner_id:{
    type:String,required:true
  },
  status:{
    type:String,enum:["PENDING","ACTIVE",'SUSPENDED','REJECTED'],default:"PENDING"
  },
  reject_reason:{
    type:String,required:true
  },
  max_members:{
    type:Number,required:true
  },
  max_trainers:{
    type:Number,required:true
  },
  created_at:{
    type:Date,required:true,default:Date.now
  },
  updated_at:{
    type:Date,required:false
  },
  deleted_at:{
    type:Date,required:false
  }
},{timestamps:true})

const Gym=mongoose.model("Gym",GymSchema)

export default Gym