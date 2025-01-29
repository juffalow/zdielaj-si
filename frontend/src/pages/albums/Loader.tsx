import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlbumPreviewLoader from '../../components/AlbumPreviewLoader';

function Loader() {
  return (
    <Row>
      <Col lg={3} md={4} sm={4} xs={6} className="mb-4">
        <AlbumPreviewLoader />
      </Col>
      <Col lg={3} md={4} sm={4} xs={6} className="mb-4" style={{ opacity: 0.4 }}>
        <AlbumPreviewLoader />
      </Col>
      <Col lg={3} md={4} sm={4} xs={6} className="mb-4" style={{ opacity: 0.2 }}>
        <AlbumPreviewLoader />
      </Col>
    </Row>
  );
}

export default Loader;
