import OtpGenerator from "../../modules/auth/application/services/OtpGenerator";

export default class OtpGeneratorService implements OtpGenerator{
  generate():string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp
  }
}