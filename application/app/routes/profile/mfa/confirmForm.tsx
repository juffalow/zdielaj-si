import { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { InputOtp, Button } from '@heroui/react';
import QRCode from 'qrcode';

interface Props {
  totpSetupDetails: any;
  onValidate: (code: string) => Promise<void>;
  onConfirm: () => Promise<unknown>;
}

const Confirm: FunctionComponent<Props> = ({ totpSetupDetails, onValidate, onConfirm }: Props) => {
  const { t } = useTranslation();
  const [ qrCode, setQrCode ] = useState<string | null>(null);
  const [ isOtpValid, setIsOtpValid ] = useState<boolean | undefined>();
  const [ isConfirmOtpValid, setIsConfirmOtpValid ] = useState<boolean | undefined>();

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
      setIsOtpValid(false);
    }
  };

  const onVerifyConfirmCode = async (code?: string) => {
    try {
      await onValidate(code as string);
      setIsConfirmOtpValid(true);
    } catch (error) {
      setIsConfirmOtpValid(false);
    }
  };

  const onSubmit = async () => {
    await onConfirm();
  };

  return (
    <div>
      <p>{t("profile.mfa.confirm.title")}</p>
      <p>{t("profile.mfa.confirm.subtitle")}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputOtp
            label={t("profile.mfa.confirm.code")}
            name="code"
            length={6}
            onComplete={onVerifyCode}
            color={isOtpValid === true ? "success" : "default"}
            isInvalid={isOtpValid === false}
          />
          <InputOtp
            label={t("profile.mfa.confirm.confirmCode")}
            name="confirmCode"
            length={6}
            onComplete={onVerifyConfirmCode}
            color={isConfirmOtpValid === true ? "success" : "default"}
            isInvalid={isConfirmOtpValid === false}
          />
        </div>
        <div>
          {
            qrCode ? (
              <img src={qrCode} alt="QR Code" />
            ) : (
              <p>{t("profile.mfa.confirm.loading")}</p>
            )
          }
        </div>
      </div>
      <Button color="primary" isDisabled={isOtpValid !== true || isConfirmOtpValid !== true} onPress={onSubmit}>
        {t("profile.mfa.confirm.submitButton")}
      </Button>
    </div>
  );
};

export default Confirm;
