import { useState, useEffect } from 'react';
import type { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Statistics from './profile/Statistics';
import PublicProfiles from './profile/PublicProfiles';
import ProfileForm from './profile/ProfileForm';
import ImagePlaceholder from './profile/image-placeholder.png';
import SEO from '../components/SEO';
import { getCurrentUser } from '../api/services';

const Profile: FunctionComponent = () => {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then((currentUser) => setUser(currentUser));
  }, []);

  return (
    <SEO title={user?.name as string || 'Profil'} description="">
      <Container>
        {
          user === null ? <p>Načítavam...</p> : null
        }

        {
          user !== null ? (
            <Row>
              <Col lg={{ span: 2, offset: 2 }}>
                <img src={ImagePlaceholder} width="100%" />
              </Col>
              <Col lg={6}>
                <h2>{ user?.name || 'Meno Priezvisko' }</h2>
                <hr />
                <ProfileForm user={user} />
                <hr />
                <PublicProfiles user={user} />
                <hr />
                <Statistics />
                <hr />
                <h4>Vymazať účet</h4>
                <p>Spolu s účtom sa zmažú aj všetky nahrané súbory a albumy.</p>
                <Button variant="danger" disabled>Vymazať</Button>
                <p><small>Funkcia zatiaľ nie je podporovaná. V prípade, že si želáte zmazať svoj účet, kontaktujte nás na e-mailovej adrese <a href="mailto:info@zdielaj.si">info@zdielaj.si</a>.</small></p>
              </Col>
            </Row>
          ) : null
        }
      </Container>
    </SEO>
  );
}

export default Profile;
