import type { FunctionComponent } from 'react';
import Badge from 'react-bootstrap/Badge';

interface Props {
  albumsCount?: number;
}

const Statistics: FunctionComponent<Props> = () => {
  return (
    <>
      <h4>Štatistika</h4>
      <p>Počet albumov <Badge bg="secondary" className="float-end" pill>N/A</Badge></p>
      <p>Počet médii <Badge bg="secondary" className="float-end" pill>N/A</Badge></p>
      <p>Veľkosť médii <Badge bg="secondary" className="float-end" pill>N/A</Badge></p>
    </>
  );
};

export default Statistics;
