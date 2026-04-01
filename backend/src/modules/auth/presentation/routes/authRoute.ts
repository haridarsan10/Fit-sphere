import express from 'express'

export default function authRoute(authController:any){
  const router=express.Router()

  router.post('/send-otp',(req,res)=>{
    authController.sendOtp(req,res)
  })

  router.post('/verify-otp',(req,res)=>{
    authController.verifyOtp(req,res)
  })

  return router
}