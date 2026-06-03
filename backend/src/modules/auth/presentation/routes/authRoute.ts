import express from 'express'

export default function authRoute(authController:any){
  const router=express.Router()

  router.post('/register',(req,res)=>{
    authController.register(req,res)
  })

  router.post('/login',(req,res)=>{
    
  })

  router.post('/verify-otp',(req,res)=>{
    authController.verifyOtp(req,res)
  })

  return router
}