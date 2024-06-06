import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../components/SEO';
import useAuth from '../utils/useAuth';
import ImagePlaceholder from './profile/image-placeholder.png';

const About: React.FC = () => {
  const { user } = useAuth();

  return (
    <SEO title={user?.meta?.name as string || 'Profil'} description="">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">Profil</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <img src={ImagePlaceholder} width="100%" />
          </Col>
          <Col>
            <p>{ user?.meta?.name }</p>
            <hr />
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default About;
