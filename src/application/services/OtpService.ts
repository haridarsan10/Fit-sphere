export default interface OtpService {
  sendOtp(phoneNumber: string): Promise<void>;
}