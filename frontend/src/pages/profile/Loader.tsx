import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarLoader from '../../components/BarLoader';

function Loader() {
  return (
    <Container>
      <Row>
      <Col lg={{ span: 8, offset: 2 }}>
          <BarLoader style={{ height: '2rem' }} />
          <hr />
          <BarLoader style={{ height: 64 }} />
          <hr />
          <BarLoader style={{ height: 64 }} />
          <hr />
          <BarLoader style={{ height: 64 }} />
          <hr />
          <BarLoader style={{ height: 64 }} />
        </Col>
      </Row>
    </Container>
  );
}

export default Loader;
