import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Statistics from './profile/Statistics';
import ProfileForm from './profile/ProfileForm';
import SEO from '../components/SEO';
import useAuth from '../utils/useAuth';
import ImagePlaceholder from './profile/image-placeholder.png';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <SEO title={user?.meta?.name as string || 'Profil'} description="">
      <Container>
        <Row>
          <Col lg={{ span: 2, offset: 2 }}>
            <img src={ImagePlaceholder} width="100%" />
          </Col>
          <Col lg={6}>
            <h2>{ user?.meta?.name || 'Meno Priezvisko' }</h2>
            <hr />
            <ProfileForm user={user as User} />
            <hr />
            <Statistics />
            <hr />
            <h4>Vymazať účet</h4>
            <p>Spolu s účtom sa zmažú aj všetky nahrané súbory a albumy.</p>
            <Button variant="danger" disabled>Vymazať</Button>
            <p><small>Funkcia zatiaľ nie je podporovaná. V prípade, že si želáte zmazať svoj účet, kontaktujte nás na e-mailovej adrese <a href="mailto:info@zdielaj.si">info@zdielaj.si</a>.</small></p>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Profile;
