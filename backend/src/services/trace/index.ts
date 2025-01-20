import AWSXRay from './AWSXRay';
import CLSHooked from './CLSHooked';
import config from '../../config';

const container = {
  get AWSXRay() {
    if (typeof this._awsXRay === 'undefined') {
      this._awsXRay = new AWSXRay(config.services.trace.plugins);
    }

    return this._awsXRay;
  },

  get CLSHooked() {
    if (typeof this._clsHooked === 'undefined') {
      this._clsHooked = new CLSHooked();
    }

    return this._clsHooked;
  }
};

export default container;
