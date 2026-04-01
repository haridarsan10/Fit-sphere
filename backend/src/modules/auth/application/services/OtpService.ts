export default interface OtpService {
  send(email: string, code: string): Promise<void>;
}