import Otp from "../domain/entities/Otp.js";
import type OtpRepository from "../domain/repositories/OtpRepository.js";
import OtpModel from "../../../infrastructure/database/models/OtpModel.js";

export default class MongoOtpRepository implements OtpRepository{
  async findByOwnerId(ownerId: string): Promise<Otp | null> {
    const doc=await OtpModel.findOne({ownerId,expiresAt:{$gt:new Date()}})
    if(!doc)return null

    return new Otp({
      id:doc._id.toString(),
      ownerId:doc.ownerId,
      code:doc.code,
      expiresAt:doc.expiresAt
    })
  }

  async deleteByOwnerId(ownerId: string): Promise<void> {
    await OtpModel.deleteOne({ownerId})
  }

  async save(otp: Otp): Promise<void> {
    await OtpModel.findByIdAndUpdate(
      otp.id,
      {
        ownerId:otp.ownerId,
        code:otp.getCode(),
        expiresAt:otp.getExpiry()
      },
      {upsert:true,new:true}
    )
  }
}