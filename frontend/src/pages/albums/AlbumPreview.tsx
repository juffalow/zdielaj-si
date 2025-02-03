import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import ImageLoader from '../../components/ImageLoader';
import { formatDate } from '../../utils/functions';

interface Props {
  album: Album;
  onPublicProfileToggle?: (album: Album) => void;
  onDelete?: (album: Album) => void;
}

const AlbumPreview: React.FC<Props> = ({ album, onPublicProfileToggle, onDelete }: Props) => (
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
      <Card.Title className="text-truncate">{'name' in album ? album.name : album.id}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</Card.Subtitle>
        <Form.Switch
          type="switch"
          checked={album.publicProfile !== null && typeof album.publicProfile.id === 'string'}
          onChange={() => onPublicProfileToggle?.call(this, album)}
          id="custom-switch"
          label="Zobrazit vo verejnom profile"
        />
      <div className="d-grid">
        <Link className="btn btn-outline-secondary" role="button" to={`/album/${album.id}`} state={{ album }}>Zobraziť</Link>
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
