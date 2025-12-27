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
      <p className="mb-2">
        {t('numberOfAlbums')}{' '}
        <Chip
          as="span"
          color={user?.statistics?.albums ? 'success' : 'secondary'}
          className="float-end"
          style={{ fontSize: '1rem' }}
        >
          {user?.statistics?.albums || 'N/A'}
        </Chip>
      </p>
      <p className="mb-2">
        {t('numberOfFiles')}{' '}
        <Chip
          as="span"
          color={user?.statistics?.files ? 'success' : 'secondary'}
          className="float-end"
          style={{ fontSize: '1rem' }}
        >
          {user?.statistics?.files || 'N/A'}
        </Chip>
      </p>
      <p className="mb-2">
        {t('totalSize')}{' '}
        <Chip
          as="span"
          color={user?.statistics?.totalSize ? 'success' : 'secondary'}
          className="float-end"
          style={{ fontSize: '1rem' }}
        >
          {user?.statistics?.totalSize ? formatBytes(user?.statistics?.totalSize) : 'N/A'}
        </Chip>
      </p>
    </>
  );
};

export default Statistics;
