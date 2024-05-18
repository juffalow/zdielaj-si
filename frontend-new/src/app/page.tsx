import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import Upload from './components/Upload';
import GOOGLE_PLAY_LOGO from './images/google_play_logo.png';
import APP_STORE_LOGO from './images/app_store_logo.png';

export default function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Zdieľaj fotky a videá v plnej kvalite</h1>
          <p className="lead">Tiež máš problém, že ti niektoré aplikácie znížujú kvalitu fotiek a videí? Tu ich môžeš zdielať bez problémov v plnej kvalite!</p>
          <Upload />
        </Col>
      </Row>
      <Row style={{ marginTop: 50 }}>
        <Col lg="4" md="4" sm="4" xs="12">
          <p style={{ marginBottom: '0.2em', fontWeight: 'bold', fontSize: '1.1rem' }}>Zadarmo ako neprihlásený užívateľ:</p>
          <ul className={styles.featuresList}>
            <li>môžeš zdieľať maximálne 10 fotiek naraz</li>
            <li>fotky budú po 24h automaticky zmazané</li>
          </ul>
        </Col>
        <Col lg="4" md="4" sm="4" xs="12">
          <p style={{ marginBottom: '0.2em', fontWeight: 'bold', fontSize: '1.1rem' }}>Zadarmo ako prihlásený užívateľ:</p>
          <ul className={styles.featuresList}>
            <li>môžeš zdieľať maximálne 50 fotiek naraz</li>
            <li>môžeš zdieľať video</li>
            <li>fotky budú po 24h automaticky zmazané</li>
            <li>môžeš vidieť zoznam svojich pridaných fotiek</li>
          </ul>
          <p className="text-center"><Link href="/registracia" className="btn btn-outline-primary" role="button">Registrácia</Link></p>
        </Col>
        <Col lg="4" md="4" sm="4" xs="12">
          <p style={{ marginBottom: '0.2em', fontWeight: 'bold', fontSize: '1.1rem' }}>Stiahni si mobilnú aplikáciu:</p>
          <a href="https://play.google.com/store/apps/details?id=si.zdielaj" target="_blank" rel="noopener noreferrer">
            <Image style={{ width: 135, height: 'auto' }} src={GOOGLE_PLAY_LOGO} alt="Google play" className="img-responsive" />
          </a>
          <a href="https://apps.apple.com/sk/app/zdie%C4%BEaj-si-cloud/id1554659147?l=sk" target="_blank" rel="noopener noreferrer">
            <Image style={{ width: 135, height: 'auto' }} src={APP_STORE_LOGO} alt="App store" className="img-responsive" />
          </a>
        </Col>
      </Row>
    </Container>
  );
}
