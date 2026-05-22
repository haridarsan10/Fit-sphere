import Account from "../domain/entities/Account.js";
import type AccountRepository from "../domain/repositories/AccountRepository.js";
import AccountModel from "../../../infrastructure/database/models/AccountModel.js";

export default class MongoAccountRepository implements AccountRepository{


  private toDomain(doc:any):Account{
    return new Account({
      id:doc.id,
      firstName:doc.firstName,
      lastName:doc.lastName,
      email:doc.email,
      password:doc.password,
      status:doc.status,
      role:doc.role
    })
  }

  async findByEmail(email: string): Promise<Account | null> {
    const doc=await AccountModel.findOne({email})

    if(!doc)return null

    return this.toDomain(doc)
  }

  async findById(id: string): Promise<Account | null> {
    const doc=await AccountModel.findById(id)

    if(!doc) return null

    return this.toDomain(doc)
  }

  async create(user: Account): Promise<Account | null> {
    try {
      
    console.log('Hi hello')

    const createUser=await AccountModel.create({
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password,
      status:user.status,
      role:user.role
    })

    console.log(createUser)

     console.log('Hi hello')

    return this.toDomain(createUser)

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async update(user: Account): Promise<Account | null> {
    const updateUser=await AccountModel.findByIdAndUpdate(
      user.id,
     {
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password,
      status:user.status,
      role:user.role
    }, {new:true}
    )
   
    return this.toDomain(updateUser)
  }

}
