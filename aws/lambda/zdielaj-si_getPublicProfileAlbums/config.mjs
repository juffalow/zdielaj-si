import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

let config = {};

export const loadConfig = async (env) => {
  const client = new SecretsManagerClient({
      region: 'eu-central-1'
  });

  const response = await client.send(new GetSecretValueCommand({
      SecretId: `${typeof env === 'string' ? env : 'dev'}/zdielaj-si`,
      VersionStage: 'AWSCURRENT',
  }));

  const secret = JSON.parse(response.SecretString);

  Object.keys(secret).forEach((key) => {
      config[key] = secret[key];
  });
}

export default config;
