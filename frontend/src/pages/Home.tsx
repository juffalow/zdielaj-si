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
import { createAlbum, createShortLink, addMedia } from '../api/services';
import useUpload from '../utils/useUpload';
import GOOGLE_PLAY_LOGO from '../img/google_play_logo.png';
import APP_STORE_LOGO from '../img/app_store_logo.png';
import styles from './home/Home.module.css';

const Home: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    clear,
    onDrop: onUploadDrop,
  } = useUpload();

  const onDrop = async (acceptedFiles: File[]) => {
    const album = await createAlbum();
    const shortLink = await createShortLink(album);
    
    onUploadDrop(acceptedFiles, async (media) => {
      await addMedia(album.id, media.id);
    });

    navigate(`/album/${album.id}`, { state: { album: { ...album, shortLink }, isNew: true } });    
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop, accept: 'image/*, video/*', maxFiles: 50 });

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
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <div {...getRootProps()} style={{ border: '1px #28a745 dashed', padding: '40px', borderRadius: '20px', textAlign: 'center', marginTop: 50 }} data-tracking-id="home_upload_area_click">
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Presuň sem fotky...</p> :
                  <p style={{ marginBottom: 0 }}>{t("home.uploadAreaText")}</p>
              }
              <div style={{ marginTop: 20 }}>
                <Button variant="outline-success" size="lg" data-tracking-id="home_upload_button_click">{t("home.uploadAreaButton")}</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col className="mb-3" lg="4" md="4" sm="12" xs="12">
            <Card className="h-100">
              <Card.Header className="py-3">
                <h4 className="text-center my-0">{t("home.pricing.default.title")}</h4>
              </Card.Header>
              <Card.Body>
                <p className="text-center" style={{ fontSize: '2.5rem' }}>0€ / <small className="text-body-secondary">{t("home.pricing.default.monthly")}</small></p>
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
                <h4 className="text-center my-0">{t("home.pricing.free.title")}</h4>
              </Card.Header>
              <Card.Body style={{ paddingBottom: '4rem' }}>
                <p className="text-center" style={{ fontSize: '2.5rem' }}>0€ / <small className="text-body-secondary">{t("home.pricing.free.monthly")}</small></p>
                <FeaturesList>
                  <li><Trans i18nKey="home.pricing.free.maxOneGB"  components={{ small: <small className="text-body-secondary" /> }} /></li>
                  <li>{t("home.pricing.free.video")}</li>
                  <li>{t("home.pricing.free.listOfAlbums")}</li>
                  <li><Trans i18nKey="home.pricing.free.filesWillBeDeletedAfter7Days" /></li>
                </FeaturesList>
                <div className={`${styles.pricingCardFooter} text-center`}>
                  <Link to="/registracia" className="btn btn-outline-primary w-100" role="button" data-tracking-id="free_register_click">{t("home.pricing.free.register")}</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" lg="4" md="4" sm="12" xs="12">
            <Card>
              <Card.Header className="py-3">
                <h4 className="text-center my-0">{t("home.pricing.standard.title")}</h4>
              </Card.Header>
              <Card.Body style={{ paddingBottom: '4rem' }}>
                <p className="text-center" style={{ fontSize: '2.5rem' }}>3€ / <small className="text-body-secondary">{t("home.pricing.standard.monthly")}</small></p>
                <FeaturesList>
                  <li><Trans i18nKey="home.pricing.standard.maxTenGB"  components={{ small: <small className="text-body-secondary" /> }} /></li>
                  <li>{t("home.pricing.standard.video")}</li>
                  <li>{t("home.pricing.standard.listOfAlbums")}</li>
                  <li>{t("home.pricing.standard.passwordProtect")}</li>
                  <li>{t("home.pricing.standard.publicProfile")}</li>
                  <li><Trans i18nKey="home.pricing.standard.filesWillNotBeDeleted" /></li>
                </FeaturesList>
                <div className={`${styles.pricingCardFooter} text-center`}>
                  <Link to="/registracia" className="btn btn-outline-primary w-100" role="button" data-tracking-id="standard_register_click">{t("home.pricing.standard.register")}</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Home;
