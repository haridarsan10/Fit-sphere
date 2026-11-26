import AddGymMedia from "../../application/use-cases/AddGymMedia.js";
import UpdateGymMedia from "../../application/use-cases/UpdateGymMedia.js";
import DeleteGymMedia from "../../application/use-cases/DeleteGymMedia.js";

export default class gymMediaController{
  constructor(
    private addGymMediaUseCase:AddGymMedia,
    private updateGymMediaUseCase:UpdateGymMedia,
    private deleteGymMediaUseCase:DeleteGymMedia
  ){}

  async addGymMedia(req:any,res:any){
    try {
      const {gym_id}=req.params
      const ownerId=req.user.sub

      if (!req.file) {
        return res.status(400).json({ message: "File is required" });
      }

      const {type,caption,display_order}=req.body

      const result = await this.addGymMediaUseCase.execute({
      gym_id,
      ownerId,
      file: req.file.buffer,
      file_name: req.file.originalname,
      mime_type: req.file.mimetype,
      type,
      caption,
      display_order: display_order ? Number(display_order) : 0
    });

      return res.status(201).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }

  async updateGymMedia(req:any,res:any){
    try {
      const {gym_id,media_id}=req.params
      const ownerId=req.user.sub

      const {type,caption,display_order}=req.body

      const result = await this.updateGymMediaUseCase.execute({
      gym_id,
      media_id,
      ownerId,
      file: req.file.buffer,
      file_name: req.file.originalname,
      mime_type: req.file.mimetype,
      type,
      caption,
      display_order: display_order ? Number(display_order) : 0
    });

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }

  async deleteGymMedia(req:any,res:any){
   try {

    const {gym_id,media_id}=req.params
    const ownerId=req.user.sub

    const result=await this.deleteGymMediaUseCase.execute({gym_id,ownerId,media_id})
    
    return res.status(200).json(result)
    
   } catch (error:any) {
    return res.status(400).json({message:error.message})
   }
  }

}