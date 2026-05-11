import ApproveGym from "../../application/use-cases/ApproveGym.js";

export default class adminController{
  constructor(
    private approveGymData:ApproveGym
  ){}

  async approveGym(req:any,res:any){
    try {

      const {gymId}=req.body

      const result=await this.approveGymData.execute(gymId)

      return res.status(201).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }
}