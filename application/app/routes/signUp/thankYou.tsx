import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ROUTES } from '../../constants';

export default function ThankYou() {
  const { i18n, t } = useTranslation('', { keyPrefix: 'signUp.thankYou' });

  return (
    <p className="text-center">
      {t('subtitle')}{' '}
      <Link
        to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signIn}`}
        className="link"
      >
        {t('subtitleLink')}
      </Link>
      .
    </p>
  );
}
