import Trainer from "../domain/entities/trainer.js";
import type TrainerRepository from "../domain/repositories/TrainerRepository.js";
import TrainerModel from "../../../infrastructure/database/models/TrainerModel.js";

export default class MongoTrainerRepository implements TrainerRepository{

  private toDomain(doc:any):Trainer{
    return new Trainer({
      id: doc._id.toString(),
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      password: doc.password,
      phoneNumber: doc.phoneNumber,
      status: doc.status      
    })
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const doc=await TrainerModel.findOne({email})
    
    if(!doc)return null

    return this.toDomain(doc)
  }

  async findById(id: string): Promise<Trainer | null> {
    const doc=await TrainerModel.findOne({id})
    
    if(!doc)return null

    return this.toDomain(doc)
  }

  async create(user: Trainer): Promise<Trainer | null> {
    const createdUser=await TrainerModel.create({
      firstname:user.firstName,
      lastname:user.lastName,
      email:user.email,
      phonenumber:user.phoneNumber,
      password:user.password,
      status:user.status
    })

    return this.toDomain(createdUser)
  }
  
  async update(user: Trainer): Promise<Trainer | null> {
    const updatedUser=await TrainerModel.findByIdAndUpdate(
      user.id,
      {
        firstname:user.firstName,
        lastname:user.lastName,
        email:user.email,
        phonenumber:user.phoneNumber,
        password:user.password,
        status:user.status
      },
      {new:true}
    )

    if(!updatedUser){
      throw new Error('Trainer not found!')
    }

    return this.toDomain(updatedUser)
  }
}