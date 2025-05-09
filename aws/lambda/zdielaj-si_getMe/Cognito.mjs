import {
  CognitoIdentityProviderClient,
  GetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';

export async function getUser(accessToken) {
  const cognitoClient = new CognitoIdentityProviderClient({
    region: 'eu-central-1',
  });
  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  try {
    const result = await cognitoClient.send(command);

    const user = {
      id: result.Username,
      email: result.UserAttributes.find((attribute) => attribute.Name === 'email').Value,
      name: result.UserAttributes.find((attribute) => attribute.Name === 'name').Value,
    };

    return user;
  } catch (error) {
    console.error('Error getting user!', { accessToken: `${accessToken.substring(0, 16)}...${accessToken.substring(accessToken.length - 16)}`, error: { message: error.message, stack: error.stack } });
  }

  return null;
}
