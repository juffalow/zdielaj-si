import type { Metadata } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from './components/LoginForm';

export const metadata: Metadata = {
  title: "Prihlásiť sa | Zdielaj.si",
};

export default function Login() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form />
        </Col>
      </Row>
    </Container>
  );
}
