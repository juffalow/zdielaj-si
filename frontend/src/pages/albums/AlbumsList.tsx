import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlbumPreview from '../../components/AlbumPreview';

const AlbumsList = ({ albums, onDelete }: { albums: Album[], onDelete: (album: Album) => Promise<void> }) => {
  return (
    <Row>                
    {
      albums.map((album) => (
        <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4">
          <AlbumPreview album={album} onDelete={onDelete} />
        </Col>
      ))
    }
    </Row>
  );
}

export default AlbumsList;
