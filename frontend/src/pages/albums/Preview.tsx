import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ImageLoader from '../../components/ImageLoader';
import { formatDate } from '../../utils/functions';

interface Props {
  album: Album;
}

const Preview: React.FC<Props> = ({ album }: Props) => (
  <Card>
      {
        album.media.length > 0 && album.media[0].thumbnails.length > 0 ? (
          <div style={{ paddingBottom: '80%', position: 'relative' }}>
            <ImageLoader src={album.media[0].thumbnails.filter(thumbnail => thumbnail.mimetype.startsWith('image/'))[0].location} style={{
              position: 'absolute',
              maxHeight: '100%',
              minHeight: '100%',
              minWidth: '100%',
            }}>
              <Card.Img
                variant="top"
                src={album.media[0].thumbnails.filter(thumbnail => thumbnail.mimetype.startsWith('image/'))[0].location}
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
      <Card.Title>{album.hash}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</Card.Subtitle>
      <div className="d-grid">
        <Link className="btn btn-outline-secondary" role="button" to={`/album/${album.hash}`}>Zobraziť</Link>
      </div>
    </Card.Body>
  </Card>
);

export default Preview;
