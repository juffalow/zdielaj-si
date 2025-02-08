import type { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../components/SEO';
import PricingTable from './subscription/PricingTable';

const Subscription: FunctionComponent = () => (
  <SEO title="Predplatné" description="">
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Predplatné</h1>
          {/* <p className="lead"></p> */}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <PricingTable />
        </Col>
      </Row>
    </Container>
  </SEO>
);

export default Subscription;
