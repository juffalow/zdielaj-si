import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

const DeleteProfile: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'profile.deleteProfile' });

  return (
    <>
      <p>{t('subtitle')}</p>
      <Button variant="danger" disabled>{t('submitButton')}</Button>
      <p><small>{t('clarifyingText')} <a href='mailto:info@zdielaj.si'>info@zdielaj.si</a>.</small></p>
    </>
  );
}

export default DeleteProfile;
