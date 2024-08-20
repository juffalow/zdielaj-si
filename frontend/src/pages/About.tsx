import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../components/SEO';
import awsCognito from './about/aws-cognito.svg';
import awsS3 from './about/aws-s3.svg';
import awsMC from './about/aws-mc.svg';
import awsSQS from './about/aws-sqs.svg';
import awsSES from './about/aws-ses.svg';
import awsCF from './about/aws-cf.svg';

const About: React.FC = () => (
  <SEO title="O aplikácii" description="">
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">O aplikácii</h1>
          <p className="lead">Aplikácia pomáha užívateľom rýchlo a ľahko zdielať fotografie a videá bez zníženia kvality. Všetky dáta sú uložené v šifrovanej forme.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Funkcie</h2>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="mb-4" lg={4}>
          <h4>Album</h4>
          <p>Možnosť vytvárať albumy pre fotky a videá. Každý album môže obsahovať ľubovolný počet médií. Všetky nahrané videá sa transkódujú na formát <i>mp4</i>, aby boli spätne prehrateľné v prehliadači. Pri sťahovaní sa vždy sťahuje originál.</p>
        </Col>
        <Col className="mb-4" lg={4}>
          <h4>Zaheslovať prístup</h4>
          <p>Vlastník albumu môže svoj album chrániť heslom, ktoré bude vyžadované pre načítanie obsahu.</p>
        </Col>
        <Col className="mb-4" lg={4}>
          <h4>Zdieľať album</h4>
          <p>Do albumu možu pridávať fotky a videá aj iní používatelia. Album sa dá zdieľať pomocou špeciálneho odkazu, alebo s konkrétnymi registrovanými používateľmi.</p>
        </Col>
        <Col className="mb-4" lg={4}>
          <h4>Verejný profil</h4>
          <p>Na unikátnom odkaze (<code>/tvojemeno/</code>) vidia iní používatelia tvoje albumy, ktoré patria do daného verejného profilu.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Technológie</h2>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="mb-4" lg={4}>
          <img src={awsCognito} style={{ height: '3rem', marginBottom: '1rem' }} />
          <h4>AWS Cognito</h4>
          <p>Pomáha spravovať autentifikáciu, autorizáciu a správu používateľov pre webové a mobilné aplikácie. Poskytuje silné bezpečnostné opatrenia, vrátane šifrovania dát, multi-faktorovej autentifikácie a možnosti blokovania účtov po niekoľkých neúspešných pokusoch o prihlásenie.</p>
        </Col>
        <Col className="mb-4" lg={4}>
          <img src={awsS3} style={{ height: '3rem', marginBottom: '1rem' }} />
          <h4>AWS S3</h4>
          <p>Poskytuje úložisko pre ukladanie a načítavanie dát. Má silné bezpečnostné opatrenia, vrátane šifrovania dát, kontrolu prístupu a sledovanie aktivity. Automaticky replikuje dáta na viacerých fyzických miestach, čo znižuje riziko stráty dát.</p>
        </Col>
        <Col className="mb-4" lg={4}>
          <img src={awsSQS} style={{ width: '3rem', marginBottom: '1rem' }} />
          <h4>AWS Simple Queue Service</h4>
          <p>Umožňuje bezproblémové spracovanie veľkého množstva správ. Je navrhnutá tak, aby pomáhala vývojárom vytvárať škálovateľné aplikácie.</p>
        </Col>
        <Col className="mb-4" lg={4}>
          <img src={awsSES} style={{ width: '3rem', marginBottom: '1rem' }} />
          <h4>AWS Simple Email Service</h4>
          <p>Umožňuje odosielať a prijímať e-maily. Je navrhnutá tak, aby pomáhala digitálnym marketérom a vývojárom aplikácií odosielať marketingové, upozorňovacie a transakčné e-maily.</p>
        </Col>
        <Col className="mb-4" lg={4}>
          <img src={awsCF} style={{ width: '3rem', marginBottom: '1rem' }} />
          <h4>AWS CloudFront</h4>
          <p>Používa globálnu sieť distribučných bodov, ktoré sú geograficky blízko koncovým používateľom, čo znižuje latenciu a zvyšuje rýchlosť načítania obsahu.</p>
        </Col>
        <Col lg={4}>
          <img src={awsMC} style={{ width: '3rem', marginBottom: '1rem' }} />
          <h4>AWS MediaConvert</h4>
          <p>Umožňuje prevádzať mediálne súbory z jedného formátu do druhého. Podporuje širokú škálu vstupných a výstupných formátov, čo umožňuje prevádzať takmer akýkoľvek typ mediálneho súboru.</p>
        </Col>
      </Row>
    </Container>
  </SEO>
);

export default About;
