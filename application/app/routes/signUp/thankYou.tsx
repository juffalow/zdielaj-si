import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { Link } from '@heroui/react';

export default function ThankYou() {
  const { t } = useTranslation('', { keyPrefix: 'signUp.thankYou' });

  return (
    <p className="text-center">{t("subtitle")} <Link as={RouterLink} to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signIn', { keyPrefix: 'routes' })}`}>{t("subtitleLink")}</Link>.</p>
  );
}
