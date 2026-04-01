import AddGym from "../../application/use-cases/AddGym";

export default class GymController{
  constructor(
    private addGymData:AddGym
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
}