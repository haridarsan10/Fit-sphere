import Client from "../domain/entities/Client.js";
import type ClientRepository from "../domain/repositories/ClientRepository.js";
import ClientModel from "../../../infrastructure/database/models/ClientModel.js";

export default class MongoClientRepository implements ClientRepository{

  private toDomain(doc:any):Client{
    return new Client({
      id:doc.id,
      account_id:doc.account_id,
      gym_id:doc.gym_id,
      trainer_id:doc.trainer_id,
      dateOfBirth:doc.dateOfBirth,
      gender:doc.gender,
      fitnessGoal:doc.fitnessGoal,
      activityLevel:doc.activityLevel,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    })
  }

  async findById(id: string): Promise<Client | null> {
    const doc=await ClientModel.findById(id)

    if(!doc)return null
    
    return this.toDomain(doc)
  }

  async findByAccountId(accountId: string): Promise<Client | null> {
    const doc=await ClientModel.findOne({account_id:accountId})

    if(!doc){
      return null
    }

    return this.toDomain(doc)
  }

  async create(client: Client): Promise<Client> {
    try {

      const createUser=await ClientModel.create({
        id:client.id,
        account_id:client.account_id,
        gym_id:client.gym_id,
        trainer_id:client.trainer_id,
        dateOfBirth:client.dateOfBirth,
        gender:client.gender,
        fitnessGoal:client.fitnessGoal,
        activityLevel:client.activityLevel,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt
      })

      return this.toDomain(createUser)

    } catch (error) {
      throw error 
    }
  }  

  async update(client: Client): Promise<Client> {
    const updateUser=await ClientModel.findByIdAndUpdate(
      {id:client.id},
      {
        id:client.id,
        account_id:client.account_id,
        gym_id:client.gym_id,
        trainer_id:client.trainer_id,
        dateOfBirth:client.dateOfBirth,
        gender:client.gender,
        fitnessGoal:client.fitnessGoal,
        activityLevel:client.activityLevel,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt
      },{returnDocument: 'after'}
    )

    return this.toDomain(updateUser)
  }

  async delete(clientId: string): Promise<void> {
    try {
      await ClientModel.findByIdAndDelete(
        {id:clientId}
      )
    } catch (error) {
      throw error
    }
  }

}