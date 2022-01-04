export default interface UserNotifications {
  onRegister(user: User, token: string): Promise<void>;

  onPasswordReset(user: User): Promise<void>;
}
