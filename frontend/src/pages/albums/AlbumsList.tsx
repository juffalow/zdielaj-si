import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlbumPreview from './AlbumPreview';

interface Props {
  albums: Album[];
  onPublicProfileToggle?: (album: Album) => void;
  onDelete?: (album: Album) => void;
}

const AlbumsList = ({ albums, onPublicProfileToggle, onDelete }: Props) => {
  return (
    <Row>                
    {
      albums.map((album) => (
        <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4">
          <AlbumPreview album={album} onPublicProfileToggle={onPublicProfileToggle} onDelete={onDelete} />
        </Col>
      ))
    }
    </Row>
  );
}

export default AlbumsList;
