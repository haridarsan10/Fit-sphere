import Account from "../entities/Account.js";

export default interface AccountRepository{
  findByEmail(email:string):Promise<Account|null>
  findById(id:string):Promise<Account|null>
  findByOwnerId(id:string):Promise<Account|null>
  create(user:Account):Promise<Account|null>
  update(user:Account):Promise<Account|null>
}