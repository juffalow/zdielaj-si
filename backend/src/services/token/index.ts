import JWT from './jwt';
import AWSCognito from './AWSCognito';
import config from '../../config';

const container = {
  get JWT() {
    return new JWT(config.services.token.secret);
  },

  get AWSCognito() {
    return new AWSCognito(
      config.services.aws.cognito.region,
      config.services.aws.cognito.poolId,
      config.services.aws.cognito.clientId,
    );
  },
};

export default container;
