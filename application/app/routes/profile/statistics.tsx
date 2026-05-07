import { use } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from '@heroui/react';
import { formatBytes } from '../../utils/functions';

interface Props {
  albums?: number;
  files?: number;
  totalSize?: number;
}

interface Props {
  getCurrentUserPromise: Promise<User>;
}

const Statistics: FunctionComponent<Props> = ({ getCurrentUserPromise }: Props) => {
  const user = use(getCurrentUserPromise);
  const { t } = useTranslation('', { keyPrefix: 'profile.statistics' });

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <span>{t('numberOfAlbums')}</span>
        <Chip color={user?.statistics?.albums ? 'success' : 'default'} style={{ fontSize: '1rem' }}>
          {user?.statistics?.albums || 'N/A'}
        </Chip>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <span>{t('numberOfFiles')}</span>
        <Chip color={user?.statistics?.files ? 'success' : 'default'} style={{ fontSize: '1rem' }}>
          {user?.statistics?.files || 'N/A'}
        </Chip>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <span>{t('totalSize')}</span>
        <Chip color={user?.statistics?.totalSize ? 'success' : 'default'} style={{ fontSize: '1rem' }}>
          {user?.statistics?.totalSize ? formatBytes(user?.statistics?.totalSize) : 'N/A'}
        </Chip>
      </div>
    </>
  );
};

export default Statistics;
