import express from "express"
import authMiddleware from "../../../auth/presentation/middleware/authMiddleware.js"
import gymController from "../controller/GymController.js"
import type TokenService from "../../../auth/application/services/TokenService.js"

export default function gymRoute(gymController:gymController,tokenService: TokenService){
  const router=express.Router()

  router.post("/", authMiddleware(tokenService), (req: any, res: any) => {
  gymController.addGym(req, res);
  });

  router.get("/", authMiddleware(tokenService), (req: any, res: any) => {
  gymController.getGyms(req, res);
  });


  return router
}