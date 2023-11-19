import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import FeaturesList from './home/FeaturesList';
import SEO from '../components/SEO';
import { createAlbum, addMedia } from '../api/services';
import useUpload from '../utils/useUpload';
import GOOGLE_PLAY_LOGO from '../img/google_play_logo.png';
import APP_STORE_LOGO from '../img/app_store_logo.png';

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
      <Container>
        <Row>
          <Col>
            <h1>Zdieľaj fotky a videá v plnej kvalite</h1>
            <p className="lead">Tiež máš problém, že ti niektoré aplikácie znížujú kvalitu fotiek a videí? Tu ich môžeš zdielať bez problémov v plnej kvalite!</p>
            <div {...getRootProps()} style={{ border: '1px #28a745 dashed', padding: '40px', borderRadius: '20px', textAlign: 'center', marginTop: 50 }}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Presuň sem fotky...</p> :
                  <p style={{ marginBottom: 0 }}>Presuň sem fotky alebo ich vyber kliknutím</p>
              }
              <div style={{ marginTop: 20 }}>
                <Button variant="success">Nahrať fotky</Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 50 }}>
          <Col lg="4" md="4" sm="4" xs="12">
            <p style={{ marginBottom: '0.2em', fontWeight: 'bold' }}>Zadarmo ako neprihlásený užívateľ:</p>
            <FeaturesList>
              <li>môžeš zdieľať maximálne 10 fotiek naraz</li>
              <li>fotky budú po 24h automaticky zmazané</li>
            </FeaturesList>
          </Col>
          <Col lg="4" md="4" sm="4" xs="12">
            <p style={{ marginBottom: '0.2em', fontWeight: 'bold' }}>Zadarmo ako prihlásený užívateľ:</p>
            <FeaturesList>
              <li>môžeš zdieľať maximálne 50 fotiek naraz</li>
              <li>môžeš zdieľať video</li>
              <li>fotky budú po 24h automaticky zmazané</li>
              <li>môžeš vidieť zoznam svojich pridaných fotiek</li>
            </FeaturesList>
            <p><Link to="/registracia" style={{ color: 'rgb(33, 37, 41)' }}>Registrácia</Link> je jednoduchá a zaberie len pár sekúnd.</p>
          </Col>
          <Col lg="4" md="4" sm="4" xs="12">
            <p style={{ marginBottom: '0.2em', fontWeight: 'bold' }}>Stiahni si mobilnú aplikáciu:</p>
            <a href="https://play.google.com/store/apps/details?id=si.zdielaj" target="_blank" rel="noopener noreferrer">
              <img style={{ width: 135 }} src={GOOGLE_PLAY_LOGO} alt="Google play" className="img-responsive" />
            </a>
            <a href="https://apps.apple.com/sk/app/zdie%C4%BEaj-si-cloud/id1554659147?l=sk" target="_blank" rel="noopener noreferrer">
              <img style={{ width: 135 }} src={APP_STORE_LOGO} alt="App store" className="img-responsive" />
            </a>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Home;
