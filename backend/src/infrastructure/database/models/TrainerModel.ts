import mongoose, { Schema } from "mongoose";

const TrainerSchema=new Schema({
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

const Trainer=mongoose.model('User',TrainerSchema)

export default Trainer