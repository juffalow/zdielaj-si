import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';

const DeleteProfile: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'profile.deleteProfile' });

  return (
    <>
      <p className="mb-4">{t('subtitle')}</p>
      <Button color="danger" variant="flat" disabled>
        {t('submitButton')}
      </Button>
      <p>
        <small>
          {t('clarifyingText')} <a href="mailto:info@zdielaj.si">info@zdielaj.si</a>.
        </small>
      </p>
    </>
  );
};

export default DeleteProfile;
