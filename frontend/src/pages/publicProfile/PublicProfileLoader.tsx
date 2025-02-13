import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AlbumPreviewLoader from '../../components/AlbumPreviewLoader';
import BarLoader from '../../components/BarLoader';

export default function PublicProfileLoader() {
  return (
    <>
      <BarLoader As="h1">&nbsp;</BarLoader>
      <BarLoader As="p">&nbsp;</BarLoader>
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
    </>
  )
}
