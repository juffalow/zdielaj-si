import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { Link } from '@heroui/react';
import { ROUTES } from '../../constants';

export default function ThankYou() {
  const { i18n, t } = useTranslation('', { keyPrefix: 'signUp.thankYou' });

  return (
    <p className="text-center">
      {t('subtitle')}{' '}
      <Link as={RouterLink} to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signIn}`}>
        {t('subtitleLink')}
      </Link>
      .
    </p>
  );
}
