import jwt, { SignOptions } from 'jsonwebtoken';

class JWTToken implements Services.Token {
  constructor(
    protected secret: string,
  ) {}

  public generate(data: Record<string, unknown>, expiresIn?: number): string {
    const signOptions: SignOptions = {
      algorithm: 'HS512',
      expiresIn,
    }

    Object.keys(signOptions).forEach(key => signOptions[key] === undefined && delete signOptions[key]);

    return jwt.sign(data, this.secret, signOptions);
  }

  public verify(token: string): Record<string, unknown> {
    return jwt.verify(token, this.secret) as Record<string, unknown>;
  }

  public decode(token: string): unknown {
    return jwt.decode(token, { complete: true });
  }

  public getUserId(data: Record<string, unknown>): { id: ID } {
    return {
      id: data.id as ID,
    };
  }
}

export default JWTToken;
