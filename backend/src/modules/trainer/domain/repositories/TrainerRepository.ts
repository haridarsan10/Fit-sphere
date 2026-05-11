import Trainer from "../entities/trainer.js"

export default interface TrainerRepository{
  findByEmail(email:string):Promise<Trainer|null>
  findById(id:string):Promise<Trainer|null>
  create(user:Trainer):Promise<Trainer|null>
  update(user: Trainer): Promise<Trainer|null>
}