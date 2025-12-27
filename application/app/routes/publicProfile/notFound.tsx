import { Alert, Button } from '@heroui/react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Alert color="warning" hideIcon={true}>
      <h1 className="text-center mb-2 text-2xl w-full">{t('publicProfile.notFound.title')}</h1>
      <p className="text-center mb-2 text-lg w-full">{t('publicProfile.notFound.subtitle')}</p>
      <p className="text-center mb-4 text-sm w-full">{t('publicProfile.notFound.clarifyingText')}</p>
      <Button
        as={Link}
        to={`/${t('routes.prefix')}${t('routes.home')}`}
        variant="bordered"
        className="w-100 mx-auto"
        data-tracking-id="public_profile_not_found_click"
      >
        {t('publicProfile.notFound.ctaButton')}
      </Button>
    </Alert>
  );
};

export default NotFound;
