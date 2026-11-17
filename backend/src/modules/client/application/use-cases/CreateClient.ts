import type ClientRepository from "../../domain/repositories/ClientRepository.js";
import Client from "../../domain/entities/Client.js";
import { v4 as uuidv4 } from "uuid";


export type CreateClientInput={
  dateOfBirth:string,
  gender:string,
  fitnessGoal:string,
  activityLevel:string
}

export default class CreateClient{
  constructor(
    private clientRepo:ClientRepository,
    private Client:Client
  ){}

  async execute(data:CreateClientInput,accountId:string,gymId:string){
      const existingClient=await this.clientRepo.findByAccountId(accountId)

      if(existingClient){
        throw new Error('Client already exists!')
      }

      // const client=new Client({
      //   id:uuidv4(),
      //   account_id:accountId,
      //   gym_id:gymId,      
      //   trainer_id:null,
      //   dateOfBirth
      //   gender
      //   fitnessGoal
      //   activityLevel
      //   createdAt
      //   updatedAt
      // })
  }
}