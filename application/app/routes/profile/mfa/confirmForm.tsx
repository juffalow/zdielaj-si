import { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { InputOTP, Button } from '@heroui/react';
import QRCode from 'qrcode';
import logger from '../../../logger';

interface Props {
  totpSetupDetails: any;
  onValidate: (code: string) => Promise<void>;
  onConfirm: () => Promise<unknown>;
}

const Confirm: FunctionComponent<Props> = ({ totpSetupDetails, onValidate, onConfirm }: Props) => {
  const { t } = useTranslation();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isOtpValid, setIsOtpValid] = useState<boolean | undefined>();
  const [isConfirmOtpValid, setIsConfirmOtpValid] = useState<boolean | undefined>();

  useEffect(() => {
    QRCode.toDataURL(totpSetupDetails.href).then((url: string) => {
      setQrCode(url);
    });
  }, [totpSetupDetails]);

  const onVerifyCode = async (code?: string) => {
    try {
      await onValidate(code as string);
      setIsOtpValid(true);
    } catch (error) {
      logger.error(error);
      setIsOtpValid(false);
    }
  };

  const onVerifyConfirmCode = async (code?: string) => {
    try {
      await onValidate(code as string);
      setIsConfirmOtpValid(true);
    } catch (error) {
      logger.error(error);
      setIsConfirmOtpValid(false);
    }
  };

  const onSubmit = async () => {
    await onConfirm();
  };

  return (
    <div>
      <p>{t('profile.mfa.confirm.title')}</p>
      <p>{t('profile.mfa.confirm.subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputOTP
            required
            isInvalid
            name="code"
            maxLength={6}
            className="mx-auto"
            onComplete={onVerifyCode}
          >
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
          <InputOTP
            required
            isInvalid
            name="confirmCode"
            maxLength={6}
            className="mx-auto"
            onComplete={onVerifyConfirmCode}
          >
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
        </div>
        <div>{qrCode ? <img src={qrCode} alt="QR Code" /> : <p>{t('profile.mfa.confirm.loading')}</p>}</div>
      </div>
      <Button variant="primary" isDisabled={isOtpValid !== true || isConfirmOtpValid !== true} onPress={onSubmit}>
        {t('profile.mfa.confirm.submitButton')}
      </Button>
    </div>
  );
};

export default Confirm;
