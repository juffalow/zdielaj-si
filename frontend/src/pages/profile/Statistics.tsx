import { use } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Badge from 'react-bootstrap/Badge';
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
      <p>{t("numberOfAlbums")} <Badge bg={user?.statistics?.albums ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{user?.statistics?.albums || 'N/A'}</Badge></p>
      <p>{t("numberOfFiles")} <Badge bg={user?.statistics?.files ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{user?.statistics?.files || 'N/A'}</Badge></p>
      <p>{t("totalSize")} <Badge bg={user?.statistics?.totalSize ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{user?.statistics?.totalSize ? formatBytes(user?.statistics?.totalSize) : 'N/A'}</Badge></p>
    </>
  );
};

export default Statistics;
