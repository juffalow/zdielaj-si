export default interface EmailService {
  sendMail(email: string, subject: string, body: string, from: string): Promise<void>;
}
