import { Alert } from '@heroui/react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Alert status="warning">
      <Alert.Content>
        <Alert.Description>
          <h1 className="text-center mb-2 text-2xl w-full">{t('album.notFound.title')}</h1>
          <p className="text-center mb-2 text-lg w-full">{t('album.notFound.subtitle')}</p>
          <p className="text-center mb-4 text-sm w-full">{t('album.notFound.clarifyingText')}</p>
        </Alert.Description>
        <Link
          to={`/${t('routes.prefix')}${t('routes.home')}`}
          className="link w-100 mx-auto block"
          data-tracking-id="album_not_found_click"
        >
          {t('album.notFound.ctaButton')}
        </Link>
      </Alert.Content>
    </Alert>
  );
};

export default NotFound;
