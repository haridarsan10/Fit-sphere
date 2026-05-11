import User from "../domain/entities/User.js";
import type UserRepository from "../domain/repositories/UserRepository.js";
import UserModel from "../../../infrastructure/database/models/UserModel.js";

export default class MongoUserRepository implements UserRepository{

  private toDomain(doc: any): User {
    return new User({
      id: doc._id.toString(),
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      password: doc.password,
      phoneNumber: doc.phoneNumber,
      status: doc.status
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc=await UserModel.findOne({email})

    if(!doc) return null
    
    return this.toDomain(doc)
  }

  async findById(id: string): Promise<User | null> {
    const doc=await UserModel.findById(id)

    if(!doc)return null

    return this.toDomain(doc)
  }

  async create(user: User): Promise<User|null> {
    const createdUser=await UserModel.create({
      firstname:user.firstName,
      lastname:user.lastName,
      email:user.email,
      phonenumber:user.phoneNumber,
      password:user.password,
      status:user.status
    })

    return this.toDomain(createdUser)
  }

  async update(user: User): Promise<User|null> {
    
    const updatedUser=await UserModel.findByIdAndUpdate(
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
      throw new Error('User not found')
    }

    return this.toDomain(updatedUser)
  }
}