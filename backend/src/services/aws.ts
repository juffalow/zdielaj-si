import AWS from 'aws-sdk';
import config from '../config';

const ses = new AWS.SES(config.services.aws);

export default {
  ses,
};
