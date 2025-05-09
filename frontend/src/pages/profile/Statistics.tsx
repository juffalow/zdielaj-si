import { use } from 'react';
import type { FunctionComponent } from 'react';
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

  return (
    <>
      <h4>Štatistika</h4>
      <p>Počet albumov <Badge bg={user?.statistics?.albums ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{user?.statistics?.albums || 'N/A'}</Badge></p>
      <p>Počet médii <Badge bg={user?.statistics?.files ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{user?.statistics?.files || 'N/A'}</Badge></p>
      <p>Veľkosť médii <Badge bg={user?.statistics?.totalSize ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{user?.statistics?.totalSize ? formatBytes(user?.statistics?.totalSize) : 'N/A'}</Badge></p>
    </>
  );
};

export default Statistics;
