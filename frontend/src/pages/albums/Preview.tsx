import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/functions';

interface Props {
  album: any;
}

const Preview: React.FC<Props> = ({ album }: Props) => (
  <Card>
    <Card.Body>
      <div style={{ paddingBottom: '100%', position: 'relative' }}>
        <Card.Img
          variant="top"
          src={album.media[0].thumbnails[0].location}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '100%',
            objectFit: 'contain',
          }} />
      </div>
      <Card.Title>{album.id}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</Card.Subtitle>
      <Link className="btn btn-primary" role="button" to={`/album/${album.id}`}>Zobrazit</Link>
    </Card.Body>
  </Card>
);

export default Preview;
