import { Suspense } from 'react';
import type { FunctionComponent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Statistics from './profile/Statistics';
import PublicProfiles from './profile/PublicProfiles';
import ProfileForm from './profile/ProfileForm';
import ChangePasswordForm from './profile/ChangePassword';
import Loader from './profile/Loader';
import ImagePlaceholder from './profile/image-placeholder.png';
import SEO from '../components/SEO';
import useAuth from '../utils/useAuth';
import { getCurrentUser } from '../api/user';
import ErrorBoundary from '../components/ErrorBoundary';

const Profile: FunctionComponent = () => {
  const { user } = useAuth();
  const getCurrentUserPromise = getCurrentUser(user?.accessToken as string);

  return (
    <SEO title={user?.meta?.name as string || 'Profil'} description="">
      <Container>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Row>
              <Col lg={{ span: 2, offset: 2 }}>
                <img src={ImagePlaceholder} width="100%" />
              </Col>
              <Col lg={6}>
                <h2>{ user?.meta?.name || 'Meno Priezvisko' }</h2>
                <hr />
                <ProfileForm getCurrentUserPromise={getCurrentUserPromise} />
                <hr />
                <ChangePasswordForm />
                <hr />
                <PublicProfiles getCurrentUserPromise={getCurrentUserPromise} />
                <hr />
                <Statistics getCurrentUserPromise={getCurrentUserPromise} />
                <hr />
                <h4>Vymazať účet</h4>
                <p>Spolu s účtom sa zmažú aj všetky nahrané súbory a albumy.</p>
                <Button variant="danger" disabled>Vymazať</Button>
                <p><small>Funkcia zatiaľ nie je podporovaná. V prípade, že si želáte zmazať svoj účet, kontaktujte nás na e-mailovej adrese <a href="mailto:info@zdielaj.si">info@zdielaj.si</a>.</small></p>
              </Col>
            </Row>
          </Suspense>
        </ErrorBoundary>
      </Container>
    </SEO>
  );
}

export default Profile;
