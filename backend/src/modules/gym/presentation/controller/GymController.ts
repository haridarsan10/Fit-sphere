import AddGym from "../../application/use-cases/AddGym.js";
import GetGyms from "../../application/use-cases/GetGyms.js";

export default class gymController{
  constructor(
    private addGymData:AddGym,
    private getGymData:GetGyms
  ){}

  async addGym(req:any,res:any) {
   try {
     const {name,description,gym_type,address,contact_phone,email,max_members,max_trainers}=req.body
     const owner_id=req.user.sub

    const result=await this.addGymData.execute({
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
      const {owner_id}=req.body

      const result =await this.getGymData.execute(owner_id)

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    } 
  }

}