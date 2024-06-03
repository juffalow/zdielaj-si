import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

/**
 * @see https://blog.devgenius.io/nodejs-typescript-authentication-service-with-amazon-cognito-user-pools-9a12ea066ffb
 */
class AWSCognitoToken implements Services.Token {
  constructor(
    protected region: string,
    protected userPoolId: string,
    protected clientId: string,
  ) {}

  public generate(): string {
    throw new Error('Unsupported operation!');
  }

  public async verify(token: string): Promise<Record<string, unknown>> {
    const decodedToken = jwt.decode(token, { complete: true });

    if (!decodedToken?.header) {
      throw new Error('Invalid token');
    }

    const jwksUri = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`;

    const client = jwksClient({
      cache: true,
      jwksUri: jwksUri,
    });

    const getSigningKey = (header, callback) => {
      return client.getSigningKey(header.kid as string, (error, key) => {
        if (error) {
          callback(error, undefined);
        } else {
          const signingKey = key?.getPublicKey();
          callback(null, signingKey);
        }
      });
    };

    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getSigningKey,
        { 
          issuer: `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}`,
          algorithms: ['RS256'],
        },
        (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded as any);
          }
        }
      );
    });
  }

  public decode(token: string): unknown {
    return jwt.decode(token, { complete: true });
  }

  public getUserId(data: Record<string, unknown>): { id: ID } {
    return {
      id: String(data.sub),
    };
  }
}

export default AWSCognitoToken;
