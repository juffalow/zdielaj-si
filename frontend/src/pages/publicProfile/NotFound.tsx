import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col className="text-center">
        <h1>{t("publicProfile.notFound.title")}</h1>
        <p className="lead">{t("publicProfile.notFound.subtitle")}</p>
        <p>{t("publicProfile.notFound.clarifyingText")}</p>
        <Link to="/" className="btn btn-outline-secondary" role="button" data-tracking-id="public_profile_not_found_click">{t("publicProfile.notFound.ctaButton")}</Link>
      </Col>
    </Row>
  );
}

export default NotFound;
