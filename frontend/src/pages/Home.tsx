import { useEffect } from 'react';
import type { FunctionComponent } from 'react'; 
import { useTranslation, Trans } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import FeaturesList from './home/FeaturesList';
import SEO from '../components/SEO';
import useAuth from '../utils/useAuth';
import { createAlbum, createUserAlbum } from '../api/album';
import retryOperation from '../utils/retryPromise';
import useUpload from '../utils/useUpload';
import logger from '../logger';
import { FaGlobeEurope, FaLock, FaCloud } from 'react-icons/fa';
import styles from './home/Home.module.css';

const Home: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, refreshSession } = useAuth();

  const {
    clear,
    uploadFiles,
  } = useUpload();

  const onDrop = async (acceptedFiles: File[]) => {
    const album: Album = user === null ? 
      await createAlbum(acceptedFiles.map((file) => ({ name: file.name, mimetype: file.type, size: file.size })))
      : await retryOperation(() => createUserAlbum(acceptedFiles.map((file) => ({ name: file.name, mimetype: file.type, size: file.size }))), { retries: 2, onUnauthorized: refreshSession });

    logger.info('Album created', album);
    
    uploadFiles(acceptedFiles, album.files.map(f => f.uploadUrl as string));
  
    navigate(`/album/${album.id}`, { state: { album, isNew: true } });    
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: user === null ? {
      'image/*': [],
    } : {
      'image/*': [],
      'video/*': [],
    },
  });

  useEffect(() => {
    clear();
  }, []);

  return (
    <SEO title="" description="Tiež máš problém, že ti niektoré aplikácie znížujú kvalitu fotiek a videí? Tu ich môžeš zdielať bez problémov v plnej kvalite!">
      <Container fluid="xl">
        <Row>
          <Col>
            <h1 className="text-center">{t("home.title")}</h1>
            <p className="lead text-center">{t("home.subtitle")}</p>
          </Col>
        </Row>
        <Row className="pb-5">
          <Col lg={{ span: 10, offset: 1 }}>
            <div {...getRootProps()} style={{ border: '1px #28a745 dashed', padding: '40px', borderRadius: '20px', textAlign: 'center', marginTop: 50 }} data-tracking-id="home_upload_area_click">
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Presuň sem fotky...</p> :
                  <p style={{ marginBottom: 0 }}>{t("home.uploadArea.title")}</p>
              }
              <div style={{ marginTop: 20 }}>
                <Button variant="outline-success" size="lg" data-tracking-id="home_upload_button_click">{t("home.uploadArea.button")}</Button>
              </div>

              {user === null && (
                <div style={{ marginTop: 30 }}>
                  <p className="mb-1 fst-italic" style={{ fontSize: '0.9rem' }}>{t("home.uploadArea.asUnregisteredUser.title")}</p>
                  <ul className="d-inline-block mx-auto text-start fst-italic" style={{ fontSize: '0.8rem' }}>
                    <li><Trans i18nKey="home.uploadArea.asUnregisteredUser.maxTenPhotos" /></li>
                    <li><Trans i18nKey="home.uploadArea.asUnregisteredUser.deletedAfter24Hours" /></li>
                  </ul>
                </div>
              )}
              
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-3" lg="4" md="4" sm="12" xs="12">
            <Card className="h-100">
              <Card.Header className="py-3">
                <h5 className="text-center my-0">{t("home.pricing.default.title")}</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-center" style={{ fontSize: '2rem' }}>0€ / <small className="text-body-secondary">{t("home.pricing.default.monthly")}</small></p>
                <FeaturesList>
                  <li><Trans i18nKey="home.pricing.default.maxTenPhotos" /></li>
                  <li><Trans i18nKey="home.pricing.default.deletedAfter24Hours" /></li>
                </FeaturesList>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" lg="4" md="4" sm="12" xs="12">
            <Card className="h-100">
              <Card.Header className="py-3">
                <h5 className="text-center my-0">{t("home.pricing.free.title")}</h5>
              </Card.Header>
              <Card.Body style={{ paddingBottom: '4rem' }}>
                <p className="text-center" style={{ fontSize: '2rem' }}>0€ / <small className="text-body-secondary">{t("home.pricing.free.monthly")}</small></p>
                <FeaturesList>
                  <li><Trans i18nKey="home.pricing.free.maxOneGB"  components={{ small: <small className="text-body-secondary" /> }} /></li>
                  <li>{t("home.pricing.free.video")}</li>
                  <li>{t("home.pricing.free.listOfAlbums")}</li>
                  <li><Trans i18nKey="home.pricing.free.filesWillBeDeletedAfter7Days" /></li>
                </FeaturesList>
                <div className={`${styles.pricingCardFooter} text-center`}>
                  <Link to={`${t("routes.prefix")}${t("routes.signUp")}`} className="btn btn-outline-primary w-100" role="button" data-tracking-id="free_register_click">{t("home.pricing.free.register")}</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" lg="4" md="4" sm="12" xs="12">
            <Card>
              <Card.Header className="py-3">
                <h5 className="text-center my-0">{t("home.pricing.standard.title")}</h5>
              </Card.Header>
              <Card.Body style={{ paddingBottom: '4rem' }}>
                <p className="text-center" style={{ fontSize: '2rem' }}>1.99€ / <small className="text-body-secondary">{t("home.pricing.standard.monthly")}</small></p>
                <FeaturesList>
                  <li><Trans i18nKey="home.pricing.standard.maxTenGB"  components={{ small: <small className="text-body-secondary" /> }} /></li>
                  <li>{t("home.pricing.standard.video")}</li>
                  <li>{t("home.pricing.standard.listOfAlbums")}</li>
                  <li>{t("home.pricing.standard.passwordProtect")}</li>
                  <li>{t("home.pricing.standard.publicProfile")}</li>
                  <li><Trans i18nKey="home.pricing.standard.filesWillNotBeDeleted" /></li>
                </FeaturesList>
                <div className={`${styles.pricingCardFooter} text-center`}>
                  <Link to={`${t("routes.prefix")}${t("routes.signUp")}`} className="btn btn-outline-primary w-100" role="button" data-tracking-id="standard_register_click">{t("home.pricing.standard.register")}</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2 id="features" className="text-center">{t("home.features.title")}</h2>
          </Col>
        </Row>
        <Row className="justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4 pt-4">
          <Col className="d-flex align-items-start">
            <FaGlobeEurope className="bi text-body-secondary flex-shrink-0 me-3" style={{ fontSize: '1.3rem' }} />
            <div>
              <h3 className="mb-0 fs-4 text-body-emphasis">{t("home.features.euData.title")}</h3>
              <p className="mt-2">{t("home.features.euData.subtitle")}</p>
            </div>
          </Col>
          <Col className="d-flex align-items-start">
            <FaCloud className="bi text-body-secondary flex-shrink-0 me-3" style={{ fontSize: '1.5rem' }} />
            <div>
              <h3 className="mb-0 fs-4 text-body-emphasis">{t("home.features.highlyAvailable.title")}</h3>
              <p className="mt-2">{t("home.features.highlyAvailable.subtitle")}</p>
            </div>
          </Col>
          <Col className="d-flex align-items-start">
            <FaLock className="bi text-body-secondary flex-shrink-0 me-3" style={{ fontSize: '1.2rem' }} />
            <div>
              <h3 className="mb-0 fs-4 text-body-emphasis">{t("home.features.encryption.title")}</h3>
              <p className="mt-2">{t("home.features.encryption.subtitle")}</p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center g-4 pt-5">
          <Col lg={12} md={12}>
            <h2 className="text-center">{t("home.features.publicProfile.title")}</h2>
            <p className="text-center">{t("home.features.publicProfile.subtitle")}</p>
          </Col>
          <Col lg={4} md={12}>
            <Card>
              <Card.Body>
                <Card.Title>BWL fotky</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">https://zdielaj.si/profil/bwl-fotky</Card.Subtitle>
                <Card.Text>
                  {t("home.features.publicProfile.bwl.description")}
                </Card.Text>
                <Card.Link href="https://zdielaj.si/profil/bwl-fotky" className="btn btn-sm btn-outline-secondary w-100">{t("home.features.publicProfile.showProfileButton")}</Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Elis the Bengal Cat</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">https://zdielaj.si/profil/elis</Card.Subtitle>
              {/* </Card.Body>
              <Card.Body className="pt-0 pb-0 ps-4 pe-4">
                <Card.Img src="https://media.zdielaj.si/generated/800x800/b19ee84dca9cb059/ad2b186c2311aefbb807190ffc7c72debcf699d3.jpeg" alt="BWL fotky" />
              </Card.Body>
              <Card.Body> */}
                <Card.Text>
                  {t("home.features.publicProfile.elis.description")}
                </Card.Text>
                <Card.Link href="https://zdielaj.si/profil/elis" className="btn btn-sm btn-outline-secondary w-100">{t("home.features.publicProfile.showProfileButton")}</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Home;
