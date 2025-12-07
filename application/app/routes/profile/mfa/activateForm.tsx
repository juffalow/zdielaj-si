import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button } from '@heroui/react';

interface Props {
  onActivate: () => void;
}

const Activate: FunctionComponent<Props> = ({ onActivate }: Props) => {
  const { t } = useTranslation();

  return (
    <Alert color="primary" hideIcon={true}>
      <p className="text-lg font-medium">{t("profile.mfa.activate.title")}</p>
      <p>{t("profile.mfa.activate.subtitle")}</p>
      <hr />
      <Button onPress={onActivate} className="mt-4" color="primary">{t("profile.publicProfile.activate.cta")}</Button>
    </Alert>
  );
};

export default Activate;
