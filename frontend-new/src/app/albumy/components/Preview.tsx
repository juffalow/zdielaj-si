import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { formatDate } from '../../../utils/functions';

interface Props {
  album: Album;
}

const Preview: React.FC<Props> = ({ album }: Props) => (
  <Card>
    <Card.Body>
      {
        album.media.length > 0 && album.media[0].thumbnails.length > 0 ? (
          <div style={{ paddingBottom: '100%', position: 'relative' }}>
            <Card.Img
              variant="top"
              src={album.media[0].thumbnails.filter(thumbnail => thumbnail.mimetype.startsWith('image/'))[0].location}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxHeight: '100%',
                objectFit: 'contain',
              }} />
          </div>
        ) : null
      }
      <Card.Title>{album.hash}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</Card.Subtitle>
      <Link className="btn btn-primary" role="button" href={`/album/${album.hash}`}>Zobraziť</Link>
    </Card.Body>
  </Card>
);

export default Preview;
