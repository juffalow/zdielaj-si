import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import FeaturesList from './home/FeaturesList';
import SEO from '../components/SEO';
import { createAlbum, addMedia } from '../api/services';
import useUpload from '../utils/useUpload';
import GOOGLE_PLAY_LOGO from '../img/google_play_logo.png';
import APP_STORE_LOGO from '../img/app_store_logo.png';
import styles from './home/Home.module.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const {
    clear,
    onDrop: onUploadDrop,
  } = useUpload();

  const onDrop = async (acceptedFiles: File[]) => {
    const album = await createAlbum();
    
    onUploadDrop(acceptedFiles, async (media) => {
      await addMedia(album.id, media.id);
    });

    navigate(`/album/${album.hash}`, { state: { album } });    
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
            <h1 className="text-center">Zdieľaj fotky a videá v plnej kvalite</h1>
            <p className="lead text-center">Tiež máš problém, že ti niektoré aplikácie znížujú kvalitu fotiek a videí? Tu ich môžeš zdielať bez problémov v plnej kvalite!</p>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 10, offset: 1 }}>
            <div {...getRootProps()} style={{ border: '1px #28a745 dashed', padding: '40px', borderRadius: '20px', textAlign: 'center', marginTop: 50 }} data-tracking-id="home_upload_area_click">
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Presuň sem fotky...</p> :
                  <p style={{ marginBottom: 0 }}>Presuň sem fotky alebo ich vyber kliknutím</p>
              }
              <div style={{ marginTop: 20 }}>
                <Button variant="outline-success" size="lg" data-tracking-id="home_upload_button_click">Nahrať fotky</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col className="mb-3" lg="4" md="4" sm="12" xs="12">
            <Card className="h-100">
              <Card.Header className="py-3">
                <h4 className="text-center my-0">Bez registrácie</h4>
              </Card.Header>
              <Card.Body>
                <p className="text-center" style={{ fontSize: '2.5rem' }}>0€ / <small className="text-body-secondary">mesačne</small></p>
                <FeaturesList>
                  <li>maximálne <b>10</b> fotiek</li>
                  <li>fotky budú po <b>24 hodinách</b> automaticky zmazané</li>
                </FeaturesList>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" lg="4" md="4" sm="12" xs="12">
            <Card className="h-100">
              <Card.Header className="py-3">
                <h4 className="text-center my-0">Zadarmo</h4>
              </Card.Header>
              <Card.Body style={{ paddingBottom: '4rem' }}>
                <p className="text-center" style={{ fontSize: '2.5rem' }}>0€ / <small className="text-body-secondary">mesačne</small></p>
                <FeaturesList>
                  <li>maximálne <b>1GB</b> <small className="text-body-secondary">(≈ 300 fotiek)</small></li>
                  <li>video</li>
                  <li>zoznam pridaných fotiek</li>
                  <li>súbory budú po <b>7 dňoch</b> automaticky zmazané</li>
                </FeaturesList>
                <div className={`${styles.pricingCardFooter} text-center`}>
                  <Link to="/registracia" className="btn btn-outline-primary w-100" role="button" data-tracking-id="free_register_click">Registrácia</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" lg="4" md="4" sm="12" xs="12">
            <Card>
              <Card.Header className="py-3">
                <h4 className="text-center my-0">Štandard</h4>
              </Card.Header>
              <Card.Body style={{ paddingBottom: '4rem' }}>
                <p className="text-center" style={{ fontSize: '2.5rem' }}>5€ / <small className="text-body-secondary">mesačne</small></p>
                <FeaturesList>
                  <li>maximálne <b>10GB</b> <small className="text-body-secondary">(≈ 3000 fotiek)</small></li>
                  <li>video</li>
                  <li>zoznam pridaných fotiek</li>
                  <li>zaheslovať prístup</li>
                  <li>súbory sa <b>nemažú</b></li>
                </FeaturesList>
                <div className={`${styles.pricingCardFooter} text-center`}>
                  <Link to="/registracia" className="btn btn-outline-primary w-100" role="button" data-tracking-id="">Kontaktovať</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col className="text-center">
            <h5>Aplikácia je dostupná aj pre iPhone a Android:</h5>
            <a href="https://play.google.com/store/apps/details?id=si.zdielaj" target="_blank" rel="noopener noreferrer" className="me-2">
              <img style={{ width: 155 }} src={GOOGLE_PLAY_LOGO} alt="Google play" className="img-responsive" />
            </a>
            <a href="https://apps.apple.com/sk/app/zdie%C4%BEaj-si-cloud/id1554659147?l=sk" target="_blank" rel="noopener noreferrer">
              <img style={{ width: 155 }} src={APP_STORE_LOGO} alt="App store" className="img-responsive" />
            </a>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Home;
