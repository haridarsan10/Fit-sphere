import express from "express"
import authMiddleware from "../../../auth/presentation/middleware/authMiddleware.js"
import authRoleMiddleware from "../../../auth/presentation/middleware/authRoleMiddleware.js"

export default function adminRoute(adminController:any){
  const router=express.Router()

  router.patch('/gyms/:gymId/approve',authMiddleware,authRoleMiddleware('ADMIN'),(req:any,res:any)=>{
   adminController.ApproveGym(req,res)
  })

  router.post('/gyms/:gymId/reject',authMiddleware,authRoleMiddleware('ADMIN'),(req:any,res:any)=>{
   adminController.RejectGym(req,res)
  })

  return router
}