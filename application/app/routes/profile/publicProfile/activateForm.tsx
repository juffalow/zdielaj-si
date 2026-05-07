import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button } from '@heroui/react';
import { Link as RouterLink } from 'react-router';

interface Props {
  onActivate: () => void;
}

const Activate: FunctionComponent<Props> = ({ onActivate }: Props) => {
  const { t } = useTranslation();

  return (
    <Alert status="accent">
      <Alert.Content>
        <Alert.Title className="text-lg font-medium">{t('profile.publicProfile.activate.title')}</Alert.Title>
        <Alert.Description>
          <p>{t('profile.publicProfile.activate.subtitle')}</p>
          <p className="mb-2">
            {t('profile.publicProfile.activate.moreInfo')}{' '}
            <RouterLink to={`/${t('routes.prefix')}${t('routes.about')}`} className="link">
              {t('profile.publicProfile.activate.moreInfoLink')}
            </RouterLink>
            .
          </p>
        </Alert.Description>
        <hr />
        <Button variant="primary" onPress={onActivate}>
          {t('profile.publicProfile.activate.cta')}
        </Button>
      </Alert.Content>
    </Alert>
  );
};

export default Activate;
