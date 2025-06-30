import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarLoader from '../../components/BarLoader';

function Loader() {
  return (
    <Container>
      <Row>
        <Col lg={{ span: 2, offset: 2 }}>
          <BarLoader style={{ height: 196, width: '100%' }} />
        </Col>
        <Col lg={6}>
          <BarLoader style={{ height: '2rem' }} />
          <hr />
          <BarLoader style={{ height: 70 }} />
          <hr />
          <BarLoader style={{ height: 28 }} />
          <BarLoader style={{ height: 304 }} />
          <hr />
          <BarLoader style={{ height: 28 }} />
          <BarLoader style={{ height: 200 }} />
        </Col>
      </Row>
    </Container>
  );
}

export default Loader;
