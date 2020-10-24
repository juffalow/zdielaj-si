import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../components/SEO';

const About: React.FC = () => (
  <SEO title="O aplikacii" description="">
    <Container>
      <Row>
        <Col>
          <h1>O aplikacii</h1>
          <p className="lead">Bola streda, 21. október a my sme sa ako každú stredu boli otužovať ráno pred prácou v jazere. Hanka, náša hlavá fotografka, spravila pár fotiek ešte kým sme boli vo vode aby nám kamaráti verili.</p>
          <p>Samozrejme, neskôr chcel každý z nás zdielať tieto fotky či už v aktivite na Strave, alebo v storieske na Instagrame. Dostupné boli v spoločnom chate v Slacku, ale kvalita fotky už bola značne znížená. Poslať si fotky medzi sebou, keď sme o miestnosť vedľa nie je problém v prípade, že všetci majú buď iPhone alebo Android. Ale nemajú... A niekto už sedel pekne doma pod perinkou na home office.</p>
          <p>A tu, v týchto zlých, závislákom a zdielačom neprajných časoch sme si povedali, že prídeme s riešením.</p>
          <blockquote className="blockquote text-right mt-4">
            <p className="mb-0">Čo keby spravíme nejakú appku, kde sa budú dať zdielať fotky bez znižovania kvality?</p>
            <footer className="blockquote-footer"><cite title="Filip">Filip</cite></footer>
          </blockquote>
        </Col>
      </Row>
    </Container>
  </SEO>
);

export default About;
