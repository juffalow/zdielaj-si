import { Alert } from '@heroui/react';
import { useTranslation } from 'react-i18next';

export default function FilesRejectionError({ code }: { code: string }) {
  const { t } = useTranslation('', { keyPrefix: 'album.filesRejectionError' });

  switch (code) {
    case 'file-too-large':
      return (
        <Alert status="danger" className="mb-10">
          <Alert.Content>
            <Alert.Title>{t('fileTooLarge')}</Alert.Title>
          </Alert.Content>
        </Alert>
      );
    case 'too-many-files':
      return (
        <Alert status="danger" className="mb-10">
          <Alert.Content>
            <Alert.Title>{t('tooManyFiles')}</Alert.Title>
          </Alert.Content>
        </Alert>
      );
    default:
      return null;
  }
}
