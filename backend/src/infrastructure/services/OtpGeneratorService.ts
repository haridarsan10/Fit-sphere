import type OtpGenerator from "../../modules/auth/application/services/OtpGenerator.js";

export default class OtpGeneratorService implements OtpGenerator{
  generate():string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp
  }
}