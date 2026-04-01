import express from 'express'

export default function gymOwnerRoute(GymOwnerController:any){
  const router=express.Router()

  router.post('/register',(req,res)=>{
    GymOwnerController.register(req,res)
  })

  router.post('/login',(req,res)=>{
    GymOwnerController.login(req,res)
  })

  return router
}