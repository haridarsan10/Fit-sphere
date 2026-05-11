import express from "express"
import authMiddleware from "../../../auth/presentation/middleware/authMiddleware.js"
import authRoleMiddleware from "../../../auth/presentation/middleware/authRoleMiddleware.js"

export default function gymRoute(gymController:any){
  const router=express.Router()

  router.post('/addGym',authMiddleware,(req:any,res:any)=>{
    gymController.addGym(req,res)
  })

  return router
}