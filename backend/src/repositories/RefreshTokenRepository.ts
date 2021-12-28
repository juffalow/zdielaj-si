export default interface RefreshTokenRepository {
  get(userId: number, token: string): Promise<RefreshToken>;

  create(userId: number, token: string, expiresAt: number): Promise<RefreshToken>;

  delete(userId: number, token: string): Promise<void>;
}
