import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button } from '@heroui/react';

interface Props {
  onActivate: () => void;
}

const Activate: FunctionComponent<Props> = ({ onActivate }: Props) => {
  const { t } = useTranslation();

  return (
    <Alert status="accent">
      <Alert.Content>
        <Alert.Title className="text-lg font-medium">{t('profile.mfa.activate.title')}</Alert.Title>
        <Alert.Description>
          <p>{t('profile.mfa.activate.subtitle')}</p>
        </Alert.Description>
        <hr />
        <Button onPress={onActivate} className="mt-4" variant="primary">
          {t('profile.publicProfile.activate.cta')}
        </Button>
      </Alert.Content>
    </Alert>
  );
};

export default Activate;
