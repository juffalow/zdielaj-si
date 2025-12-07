import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { setUpTOTP, verifyTOTPSetup, updateMFAPreference} from 'aws-amplify/auth';
import Activate from './mfa/activateForm';
import Confirm from './mfa/confirmForm';
import logger from '../../logger';

const MFA: FunctionComponent = () => {
  const [ formType, setFormType ] = useState<'info' | 'confirm' | 'summary'>('info');
  const [ totpSetupDetails, setTotpSetupDetails ] = useState<any | null>(null);

  const onActivate = async () => {
    try {
      const totpSetupDetails = await setUpTOTP();
      const appName = 'zdielaj.si';
      const setupUri = totpSetupDetails.getSetupUri(appName);

      setTotpSetupDetails(setupUri);
    } catch (error) {
      logger.error(error);
    }
    setFormType('confirm');
  };

  const onValidate = async (code: string) => {
    return verifyTOTPSetup({ code: code });
  }

  const onConfirm = async () => {
      return updateMFAPreference({
        totp: 'ENABLED',
      });
  }

  return (
    <>
      {
        formType === 'info' ? (
          <Activate onActivate={onActivate} />
        ) : formType === 'confirm' ? (
          <Confirm totpSetupDetails={totpSetupDetails} onValidate={onValidate} onConfirm={onConfirm} />
        ) : null
      }
    </>
  );
};

export default MFA;
