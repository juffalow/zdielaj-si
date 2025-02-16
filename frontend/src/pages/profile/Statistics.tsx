import type { FunctionComponent } from 'react';
import Badge from 'react-bootstrap/Badge';
import { formatBytes } from '../../utils/functions';

interface Props {
  albums?: number;
  files?: number;
  totalSize?: number;
}

const Statistics: FunctionComponent<Props> = ({ albums, files, totalSize }: Props) => {
  return (
    <>
      <h4>Štatistika</h4>
      <p>Počet albumov <Badge bg={albums ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{albums || 'N/A'}</Badge></p>
      <p>Počet médii <Badge bg={files ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{files || 'N/A'}</Badge></p>
      <p>Veľkosť médii <Badge bg={totalSize ? 'success' : 'secondary'} className="float-end" style={{ fontSize: '1rem' }} pill>{totalSize ? formatBytes(totalSize) : 'N/A'}</Badge></p>
    </>
  );
};

export default Statistics;
