import type { FunctionComponent } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SEO from '../components/SEO';

const PrivacyPolicy: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'privacyPolicy' });

  return (
    <SEO title={t("title")} description="">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center">{t("title")}</h1>
            <p className="lead">{t("subtitle")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">{t("firstSection.title")}</h2>
            <p>{t("firstSection.paragraph1")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">{t("secondSection.title")}</h2>
            <p><Trans i18nKey="privacyPolicy.secondSection.paragraph1" /></p>
            <p><Trans i18nKey="privacyPolicy.secondSection.paragraph2" /></p>
            <p><Trans i18nKey="privacyPolicy.secondSection.paragraph3" /></p>
            <p><Trans i18nKey="privacyPolicy.secondSection.paragraph4" /></p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">{t("thirdSection.title")}</h2>
            <p>{t("thirdSection.paragraph1")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">{t("fourthSection.title")}</h2>
            <p>{t("fourthSection.paragraph1")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">{t("fifthSection.title")}</h2>
            <p>{t("fifthSection.paragraph1")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">{t("sixthSection.title")}</h2>
            <p>{t("sixthSection.paragraph1")}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center">{t("seventhSection.title")}</h2>
            <p><Trans i18nKey="privacyPolicy.seventhSection.paragraph1"
                  components={{ mailto: <a href="mailto:info@zdielaj.si" /> }}
                />
            </p>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default PrivacyPolicy;
