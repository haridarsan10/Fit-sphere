import ApproveGym from "../../application/use-cases/ApproveGym.js";
import RejectGym from "../../application/use-cases/RejectGym.js";

export default class adminController{
  constructor(
    private approveGymData:ApproveGym,
    private rejectGymData:RejectGym
  ){}

  async ApproveGym(req:any,res:any){
    try {
      const {gymId}=req.params

      const result=await this.approveGymData.execute({gym_id:gymId})

      if (!result) {
        return res.status(404).json({message: "Gym not found"});
      }

      return res.status(200).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }

  async RejectGym(req:any,res:any){
    try {
      const {gymId}=req.params
      const {reason}=req.body

      const result=await this.rejectGymData.execute({gym_id:gymId,reason})

      if (!result) {
        return res.status(404).json({message: "Gym not found"});
      }

      return res.status(201).json(result)

    } catch (error:any) {
      return res.status(400).json({message:error.message})
    }
  }
}