import { Alert } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export default function FilesRejectionError({ code }: { code: string }) {
  const { t } = useTranslation('', { keyPrefix: 'album.filesRejectionError' });

  switch (code) {
    case 'file-too-large':
      return <Alert color="danger" title={t('fileTooLarge')} hideIcon={true} classNames={{ base: 'mb-10' }} />;
    case 'too-many-files':
      return <Alert color="danger" title={t('tooManyFiles')} hideIcon={true} classNames={{ base: 'mb-10' }} />;
    default:
      return null;
  }
}
