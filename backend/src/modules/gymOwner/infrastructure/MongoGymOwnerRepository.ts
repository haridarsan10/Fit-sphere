import GymOwner from "../domain/entities/GymOwner"
import GymOwnerRepository from "../domain/repositories/GymOwnerRepository"
import GymOwnerModel from "../../../infrastructure/database/models/GymOwnerModel"

export default class MongoGymOwnerRepository implements GymOwnerRepository{

  async findByEmail(email: string): Promise<GymOwner | null> {
    const doc=await GymOwnerModel.findOne([email])

    if(!doc)return null

    return new GymOwner({
      id:doc._id.toString(),
      firstName:doc.firstname,
      lastName:doc.lastname,
      email:doc.email,
      password:doc.password,
      phoneNumber:doc.phoneNumber,
      status:doc.status
    })
  }

  async findById(id: string): Promise<GymOwner | null> {
    const doc=await GymOwnerModel.findById(id)

    if(!doc)return null
    
    return new GymOwner({
      id:doc._id.toString(),
      firstName:doc.firstname,
      lastName:doc.lastname,
      email:doc.email,
      password:doc.password,
      phoneNumber:doc.phoneNumber,
      status:doc.status
    })
  }

  async save(owner: GymOwner): Promise<void> {
    await GymOwnerModel.findByIdAndUpdate(
      owner.id,
      {
        firstname:owner.firstName,
        lastname:owner.lastName,
        email:owner.email,
        password:owner.email,
        phoneNumber:owner.phoneNumber,
        status:owner.status
      },
      {upsert:true,new:true}
    )
  }
}