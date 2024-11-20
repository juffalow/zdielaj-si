import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ThankYou = ({ t }: WithTranslation) => (
  <Row>
    <Col>
      <h1 className="text-center">{t("register.thankYou.title")}</h1>
      <p className="text-center">{t("register.thankYou.subtitle")} <Link to="/prihlasit-sa">{t("register.thankYou.subtitleLink")}</Link>.</p>
    </Col>
  </Row>
);

export default withTranslation()(ThankYou);
