import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ImageLoader from '../components/ImageLoader';
import { formatDate } from '../utils/functions';

interface Props {
  album: Album;
  onDelete?: (album: Album) => void;
}

const AlbumPreview: React.FC<Props> = ({ album, onDelete }: Props) => (
  <Card>
      {
        album.media.length > 0 && album.media[0].thumbnails.length > 0 ? (
          <div style={{ paddingBottom: '80%', position: 'relative' }}>
            <ImageLoader src={album.media[0].thumbnails[0]} style={{
              position: 'absolute',
              maxHeight: '100%',
              minHeight: '100%',
              minWidth: '100%',
            }}>
              <Card.Img
                variant="top"
                src={album.media[0].thumbnails[0]}
                style={{
                  position: 'absolute',
                  maxHeight: '100%',
                  minHeight: '100%',
                  objectFit: 'cover',
                }} />
            </ImageLoader>
          </div>
        ) : null
      }
    <Card.Body>
      <Card.Title>{album.id}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</Card.Subtitle>
      <div className="d-grid">
        <Link className="btn btn-outline-secondary" role="button" to={`/album/${album.id}`}>Zobraziť</Link>
        {
          typeof onDelete === 'function' ? (
            <Button variant="outline-danger" className="mt-2" onClick={() => onDelete && onDelete(album)}>Vymazať</Button>
          ) : null
        }
      </div>
    </Card.Body>
  </Card>
);

export default AlbumPreview;
