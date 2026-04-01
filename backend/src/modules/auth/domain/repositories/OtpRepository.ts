  import Otp  from "../entities/Otp";

  export default interface OtpRepository{
    save(otp:Otp):Promise<void>
    findByOwnerId(ownerId:string):Promise<Otp|null>
    deleteByOwnerId(ownerId:string):Promise<void>
  }