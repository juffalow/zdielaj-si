import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { setUpTOTP, verifyTOTPSetup, updateMFAPreference} from 'aws-amplify/auth';
import Activate from './mfa/activateForm';
import Confirm from './mfa/confirmForm';
import logger from '../../logger';

interface Props {
}

const MFA: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const [ formType, setFormType ] = useState<'info' | 'confirm' | 'summary'>('info');
  const [ totpSetupDetails, setTotpSetupDetails ] = useState<any | null>(null);

  const onActivate = async () => {
    try {
      const totpSetupDetails = await setUpTOTP();
      const appName = 'zdielaj.si';
      const setupUri = totpSetupDetails.getSetupUri(appName);

      console.log(setupUri);

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

  const onUpdate = async (prevState: unknown, values: FormData) => {

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
