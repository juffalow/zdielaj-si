import AWSEmail from './AWSEmail';
import CompositeEmail from './CompositeEmail';
import DBEmail from './DBEmail';
import aws from '../aws';
import config from '../../config';
import { EmailLog } from '../../repositories';

const awsEmail = new AWSEmail(aws.ses, config.services.email.unsubscribeUrl);
const dbEmail = new DBEmail(EmailLog());

export default new CompositeEmail([awsEmail, dbEmail]);
