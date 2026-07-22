import express from "express"
import authMiddleware from "../../../auth/presentation/middleware/authMiddleware.js"
import GymController from "../controller/GymController.js"

export default function gymRoute(gymController:GymController){
  const router=express.Router()

  router.post('/gym',authMiddleware,(req:any,res:any)=>{
    gymController.addGym(req,res)
  })

  router.get('/gym',authMiddleware,(req:any,res:any)=>{
    gymController.getGyms(req,res)
  })
  
  return router
}