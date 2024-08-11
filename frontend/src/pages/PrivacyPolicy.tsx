import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => (
  <SEO title="Zásady ochrany osobných údajov" description="">
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Zásady ochrany osobných údajov</h1>
          <p className="lead">Ak ste návštevníkom webovej stránky Zdielaj.si alebo zákazníkom služby Zdielaj.si, potom sa na vaše používanie tejto webovej stránky alebo služby vzťahujú "zásady ochrany osobných údajov".</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Aký typ informácií zhromažďujeme?</h2>
          <p>Aby sme mohli poskytovať služby Zdielaj.si, musíme o vás spracovávať informácie. Typy informácií, ktoré zhromažďujeme, závisia od toho, ako používate naše služby.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Ako tieto informácie používame?</h2>
          <p><b>Poskytovať, personalizovať a zlepšovať naše služby.</b> Informácie, ktoré máme, používame na poskytovanie našich služieb, prispôsobenie funkcií a vytváranie návrhov pre vás.</p>
          <p><b>Výskum a vývoj produktu.</b> Informácie, ktoré máme, používame na vývoj, testovanie a zlepšovanie našich služieb. Takéto spracovanie je nevyhnutné pre naše oprávnené záujmy spočívajúce v poskytovaní inovatívnych služieb našim používateľom.</p>
          <p><b>Podporovať bezpečnosť a integritu.</b> Informácie, ktoré máme, používame na overenie účtov a aktivity, boj proti škodlivému správaniu, zisťovanie a predchádzanie spamu a iným zlým skúsenostiam, udržiavanie integrity našich služieb.</p>
          <p><b>Komunikácia s vami.</b> Informácie, ktoré máme, používame na zasielanie marketingovej komunikácie, relevantných noviniek a aktualizácií, o ktorých sa domnievame, že by vás mohli zaujímať.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Ako chránime vaše informácie?</h2>
          <p>Vaše osobné údaje sú šifrované, za zabezpečenými sieťami a sú prístupné iba obmedzenému počtu osôb, ktoré majú špeciálne prístupové práva k takýmto systémom a sú povinné uchovávať informácie v tajnosti.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Ako sa tieto informácie zdieľajú?</h2>
          <p>Vaše osobné údaje nepredávame, neobchodujeme s nimi ani ich inak neprevádzame externým stranám. To nezahŕňa partnerov hosťovania webových stránok a iné strany, ktoré nám pomáhajú pri prevádzke našej webovej stránky, pri vykonávaní našej činnosti alebo pri poskytovaní služieb našim používateľom, pokiaľ tieto strany súhlasia s tým, že budú tieto informácie uchovávať v tajnosti.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Uchovávanie údajov, deaktivácia a vymazanie účtu</h2>
          <p>Údaje uchovávame dovtedy, kým už nie sú potrebné na poskytovanie našich služieb alebo kým sa váš účet neodstráni – podľa toho, čo nastane skôr.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Ako vás budeme informovať o zmenách týchto zásad?</h2>
          <p>Z času na čas môžeme aktualizovať tieto zásady. Ak to bude možné, upozorníme vás na zmeny alebo vám budeme pravidelne pripomínať, aby ste si prečítali tieto sásady prostredníctvom e-mailu.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Ako kontaktovať Zdielaj.si s otázkami?</h2>
          <p>Možete nás kontaktovať zaslaní emailu na <a href="mailto:info@zdielaj.si">info@zdielaj.si</a>.</p>
        </Col>
      </Row>
    </Container>
  </SEO>
);

export default PrivacyPolicy;
