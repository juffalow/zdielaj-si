import AWSEmail from './AWSEmail';
import CompositeEmail from './CompositeEmail';
import DBEmail from './DBEmail';
import services from '../';
import config from '../../config';
import repositories from '../../repositories';

const container = {
  get AWSEmail() {
    return new AWSEmail(services.AWS.ses, config.services.email.unsubscribeUrl);
  },

  get DBEmail() {
    return  new DBEmail(repositories.EmailLog);
  },

  get CompositeEmail() {
    return  new CompositeEmail();
  },
};

export default container;
