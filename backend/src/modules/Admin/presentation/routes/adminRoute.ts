import express from "express"
import authMiddleware from "../../../auth/presentation/middleware/authMiddleware"
import authRoleMiddleware from "../../../auth/presentation/middleware/authRoleMiddleware"

export default function adminRoute(adminController:any){
  const router=express.Router()

  router.post('/approveGym',authMiddleware,authRoleMiddleware('ADMIN'),(req:any,res:any)=>{
   adminController.approveGym(req,res)
  })

  return router
}