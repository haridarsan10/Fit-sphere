import mongoose,{Schema} from "mongoose";

const ClientSchema=new Schema({
  id:{
    type:String,required:true,unique:true
  },
  account_id:{
    type:String,required:true,unique:true
  },
  gym_id:{
    type:String,required:false
  },
  trainer_id:{
    type:String,required:false
  },
  fitnessGoal:{
    type:String,required:false
  },
  createdAt: {
    type:Date,required:false,default:Date.now
  },
  updatedAt: {
    type:Date,required:false
  }
})

const ClientModel=mongoose.model('Account',ClientSchema)

export default ClientModel