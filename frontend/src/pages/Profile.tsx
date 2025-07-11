import { Suspense } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/esm/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Statistics from './profile/Statistics';
import PublicProfile from './profile/PublicProfile';
import Detail from './profile/ProfileForm';
import ChangePasswordForm from './profile/ChangePassword';
import DeleteProfile from './profile/DeleteProfile';
import Loader from './profile/Loader';
import SEO from '../components/SEO';
import useAuth from '../utils/useAuth';
import { getCurrentUser } from '../api/user';
import { getPublicProfile } from '../api/publicprofiles';
import ErrorBoundary from '../components/ErrorBoundary';

const Profile: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'profile' });
  const { user } = useAuth();
  const getCurrentUserPromise = getCurrentUser(user?.accessToken as string);
  const getCurrentUserPublicProfilePromise = getCurrentUserPromise.then(user => getPublicProfile(user.publicProfileId as string));

  return (
    <SEO title={user?.meta?.name as string || 'Profil'} description="">
      <Container>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Row>
              <Col lg={{ span: 8, offset: 2 }}>
                <h2>{ user?.meta?.name || 'Meno Priezvisko' }</h2>
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header><span className="h5">{t("detail.title")}</span></Accordion.Header>
                    <Accordion.Body className="ps-5 pe-5">
                      <Detail getCurrentUserPromise={getCurrentUserPromise} />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header><span className="h5">{t("changePasswordForm.title")}</span></Accordion.Header>
                    <Accordion.Body className="ps-5 pe-5">
                      <ChangePasswordForm />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header><span className="h5">{t("publicProfile.title")}</span></Accordion.Header>
                    <Accordion.Body className="ps-5 pe-5">
                      <PublicProfile getCurrentUserPublicProfilePromise={getCurrentUserPublicProfilePromise} />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header><span className="h5">{t("statistics.title")}</span></Accordion.Header>
                    <Accordion.Body className="ps-5 pe-5">
                      <Statistics getCurrentUserPromise={getCurrentUserPromise} />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header><span className="h5">{t("deleteProfile.title")}</span></Accordion.Header>
                    <Accordion.Body className="ps-5 pe-5">
                      <DeleteProfile />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Suspense>
        </ErrorBoundary>
      </Container>
    </SEO>
  );
}

export default Profile;
