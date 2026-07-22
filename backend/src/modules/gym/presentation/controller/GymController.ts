import AddGym from "../../application/use-cases/AddGym.js";
import GetGyms from "../../application/use-cases/GetGyms.js";

export default class GymController{
  constructor(
    private addGymData:AddGym,
    private getGymData:GetGyms
  ){}

  async addGym(req:any,res:any) {
   try {
     const {name,description,address,contact_phone,email,owner_id,max_members,max_trainers}=req.body

    const result=await this.addGymData.execute({
      name,
      description,
      address,
      contact_phone,
      email,
      ownerId:owner_id,
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
      const {owner_id}=req.body

      const result =await this.getGymData.execute(owner_id)

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    } 
  }

}