export default interface UserRepository {
  getByEmail(email: string): Promise<User>;

  create(name: string, email: string, password: string): Promise<User>;
}
