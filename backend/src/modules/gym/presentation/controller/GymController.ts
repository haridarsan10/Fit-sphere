import AddGym from "../../application/use-cases/AddGym.js";
import GetGyms from "../../application/use-cases/GetGyms.js";
import GetGymById from "../../application/use-cases/GetGymById.js";
import UpdateGym from "../../application/use-cases/UpdateGym.js";

export default class gymController{
  constructor(
    private addGymUseCase:AddGym,
    private getGymUseCase:GetGyms,
    private getGymByIdUseCase:GetGymById,
    private updateGymUseCase:UpdateGym
  ){}

  async addGym(req:any,res:any) {
   try {
     const {name,description,gym_type,address,contact_phone,email,max_members,max_trainers}=req.body
     const owner_id=req.user.sub

    const result=await this.addGymUseCase.execute({
      name,
      description,
      gym_type,
      address,
      contact_phone,
      email,
      owner_id,
      max_members,
      max_trainers
    })

     return res.status(201).json(result)

   } catch (error:any) {
      return res.status(400).json({message:error.message})
   }
  }

  async getGyms(req:any,res:any){
    try {
      const owner_id=req.user.sub
      const result =await this.getGymUseCase.execute(owner_id)

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    } 
  }

  async getGymById(req:any,res:any){
    try {
      const {gymId}=req.params
      const ownerId=req.user.sub

    
      const result=await this.getGymByIdUseCase.execute(gymId,ownerId)
      
      return res.status(200).json(result)

    } catch (error:any) {
      if (error.message === "You are not authorized to access this gym") {
          return res.status(403).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateGym(req:any,res:any){
    try {
      const {gymId}=req.params
      const ownerId=req.user.sub
      const updateData=req.body

      const result=await this.updateGymUseCase.execute(gymId,ownerId,updateData)

      if (!result) {
        return res.status(404).json({message: "Gym not found"});
      }

      return res.status(200).json(result) 

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }    
  }
}