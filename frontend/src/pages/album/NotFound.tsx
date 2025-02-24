import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col className="text-center">
        <h1>{t("album.notFound.title")}</h1>
        <p className="lead">{t("album.notFound.subtitle")}</p>
        <p>{t("album.notFound.clarifyingText")}</p>
        <Link to="/" className="btn btn-outline-secondary" role="button" data-tracking-id="album_not_found_click">{t("album.notFound.ctaButton")}</Link>
      </Col>
    </Row>
  );
}

export default NotFound;
