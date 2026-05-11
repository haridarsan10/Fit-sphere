import User from "../entities/User.js"

export default interface UserRepository{
  findByEmail(email:string):Promise<User|null>
  findById(id:string):Promise<User|null>
  create(user:User):Promise<User|null>
  update(user: User): Promise<User|null>
}