import AWSEmail from './AWSEmail';
import CompositeEmail from './CompositeEmail';
import DBEmail from './DBEmail';
import EmailLogRepository from '../../repositories/KnexEmailLogRepository';

const awsEmail = new AWSEmail();
const dbEmail = new DBEmail(new EmailLogRepository);

export default new CompositeEmail([awsEmail, dbEmail]);
