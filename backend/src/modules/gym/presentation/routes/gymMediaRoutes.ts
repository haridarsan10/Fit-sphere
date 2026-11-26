import  express  from "express"
import gymMediaController from "../controller/GymMediaController.js"
import type TokenService from "../../../auth/application/services/TokenService.js"
import authMiddleware from "../../../auth/presentation/middleware/authMiddleware.js"
import upload from "../../../../infrastructure/middlewares/uploadMiddleware.js";
import authRoleMiddleware from "../../../auth/presentation/middleware/authRoleMiddleware.js";


export default function gymMediaRoute(gymMediaController:gymMediaController,tokenService:TokenService){
  const router=express.Router()

  router.post("/:gym_id/media",authMiddleware(tokenService),authRoleMiddleware("Gymowner"),upload.single("file"),(req, res) => 
    gymMediaController.addGymMedia(req, res)
  );

  router.patch("/:gym_id/media/:media_id",authMiddleware(tokenService),authRoleMiddleware("Gymowner"),upload.single("file"),(req, res)=> 
    gymMediaController.updateGymMedia(req, res)
  );

  router.delete("/:gym_id/media/:media_id",authMiddleware(tokenService),authRoleMiddleware("GYM_OWNER"),(req, res) => 
    gymMediaController.deleteGymMedia(req, res)
  );

  return router
}