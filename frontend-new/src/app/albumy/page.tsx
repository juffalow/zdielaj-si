import type { Metadata } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from './components/Loader';

export const metadata: Metadata = {
  title: "Albumy | Zdielaj.si",
  robots: {
    index: false,
  },
};

export default function Albums() {
  return (
    <Container>
      <Row>
        <Col>
          <Loader />
        </Col>
      </Row>
    </Container>
  );
}
