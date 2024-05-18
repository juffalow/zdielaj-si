import type { Metadata } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Switch from './components/Switch';

export const metadata: Metadata = {
  title: "Registrácia | Zdielaj.si",
};

export default function Register() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Switch />
        </Col>
      </Row>
    </Container>
  );
}
