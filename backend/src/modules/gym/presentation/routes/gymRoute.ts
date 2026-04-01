import express from "express"
import authMiddleware from "../../../auth/presentation/middleware/authMiddleware"
import authRoleMiddleware from "../../../auth/presentation/middleware/authRoleMiddleware"

export default function gymRoute(gymController:any){
  const router=express.Router()

  router.post('/addGym',authMiddleware,(req:any,res:any)=>{
    gymController.addGym(req,res)
  })

  return router
}