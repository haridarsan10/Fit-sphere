import GymOwner from "../domain/entities/GymOwner.js"
import type GymOwnerRepository from "../domain/repositories/GymOwnerRepository.js"
import GymOwnerModel from "../../../infrastructure/database/models/GymOwnerModel.js"
import { stat } from "node:fs"

export default class MongoGymOwnerRepository implements GymOwnerRepository{

  private toDomain(doc:any):GymOwner{
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

  async findByEmail(email: string): Promise<GymOwner | null> {
    const doc=await GymOwnerModel.findOne([email])

    if(!doc)return null

    return this.toDomain(doc)
  }

  async findById(id: string): Promise<GymOwner | null> {
    const doc=await GymOwnerModel.findById(id)

    if(!doc)return null
    
    return this.toDomain(doc)
  }


  async create(user: GymOwner): Promise<GymOwner | null> {
    const createdGymOwner=await GymOwnerModel.create({
      firstname:user.firstName,
      lastname:user.lastName,
      email:user.email,
      phoneNumber:user.phoneNumber,
      password:user.password,
      status:user.status
    })

    return this.toDomain(createdGymOwner)
  }

  async update(user: GymOwner): Promise<GymOwner|null> {
    const updatedGymOwner=await GymOwnerModel.findByIdAndUpdate(
      user.id,
      {
        firstname:user.firstName,
        lastname:user.lastName,
        email:user.email,
        password:user.email,
        phoneNumber:user.phoneNumber,
        status:user.status
      },
      {new:true}
    )

    if(!updatedGymOwner){
      throw new Error('Gym owner not found')
    }

    return this.toDomain(updatedGymOwner)
  }
}