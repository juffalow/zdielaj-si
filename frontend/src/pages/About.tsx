import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SEO from '../components/SEO';

import { FaGlobeEurope, FaLock, FaCloud } from 'react-icons/fa';

const About: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'about' });

  return (
    <SEO title={t("title")} description="">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">{t("title")}</h1>
            <p className="text-center lead">{t("subtitle")}</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 id="public-profile" className="text-center">{t("features.title")}</h2>
          </Col>
        </Row>
        <Row className="justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 pt-5">
          <Col className="d-flex align-items-start">
            <FaGlobeEurope className="bi text-body-secondary flex-shrink-0 me-3" style={{ fontSize: '1.4rem' }} />
            <div>
              <h3 className="mb-0 fs-4 text-body-emphasis">{t("features.euData.title")}</h3>
              <p className="mt-2">{t("features.euData.subtitle")}</p>
            </div>
          </Col>
          <Col className="d-flex align-items-start">
            <FaCloud className="bi text-body-secondary flex-shrink-0 me-3" style={{ fontSize: '1.4rem' }} />
            <div>
              <h3 className="mb-0 fs-4 text-body-emphasis">{t("features.highlyAvailable.title")}</h3>
              <p className="mt-2">{t("features.highlyAvailable.subtitle")}</p>
            </div>
          </Col>
          <Col className="d-flex align-items-start">
            <FaLock className="bi text-body-secondary flex-shrink-0 me-3" style={{ fontSize: '1.4rem' }} />
            <div>
              <h3 className="mb-0 fs-4 text-body-emphasis">{t("features.encryption.title")}</h3>
              <p className="mt-2">{t("features.encryption.subtitle")}</p>
            </div>
          </Col>
        </Row> 
        <Row className="justify-content-center g-4 pt-5">
          <Col lg={12} md={12}>
            <h3 className="text-center">{t("features.publicProfile.title")}</h3>
            <p className="text-center">{t("features.publicProfile.subtitle")}</p>
          </Col>
          <Col lg={4} md={12}>
            <Card>
              <Card.Body>
                <Card.Title>BWL fotky</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">https://zdielaj.si/profil/bwl-fotky</Card.Subtitle>
                <Card.Text>
                  {t("features.publicProfile.bwl.description")}
                </Card.Text>
                <Card.Link href="https://zdielaj.si/profil/bwl-fotky">{t("features.publicProfile.showProfileButton")}</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Elis the Bengal Cat</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">https://zdielaj.si/profil/elis</Card.Subtitle>
                <Card.Text>
                  {t("features.publicProfile.elis.description")}
                </Card.Text>
                <Card.Link href="https://zdielaj.si/profil/elis">{t("features.publicProfile.showProfileButton")}</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default About;
