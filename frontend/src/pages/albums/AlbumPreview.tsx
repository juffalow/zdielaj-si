import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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

const AlbumPreview: React.FC<Props> = ({ album, onPublicProfileToggle, onDelete }: Props) => {
  const { t } = useTranslation();

  return (
    <Card>
      <div style={{ paddingBottom: '80%', position: 'relative' }}>
        {
          album.media.length > 0 && album.media[0].thumbnails.length > 0 ? (
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
          ) : (
            <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>{t("albums.albumPreview.noFiles")}</p>
          )
        }
      </div>
      <Card.Body>
        <Card.Title className="text-truncate">{'name' in album ? album.name : album.id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</Card.Subtitle>
        <Form.Switch
          type="switch"
          checked={'publicProfile' in album && album.publicProfile !== null && typeof album.publicProfile.id === 'string'}
          onChange={() => onPublicProfileToggle?.call(this, album)}
          label={t("albums.albumPreview.publicProfileToggle")}
        />
        <div className="d-grid">
          <Link className="btn btn-outline-secondary" role="button" to={`/album/${album.id}`} state={{ album }}>{t("albums.albumPreview.show")}</Link>
          {
            typeof onDelete === 'function' ? (
              <Button variant="outline-danger" className="mt-2" onClick={() => onDelete && onDelete(album)}>{t("albums.albumPreview.delete")}</Button>
            ) : null
          }
        </div>
      </Card.Body>
    </Card>
  );
}

export default memo(AlbumPreview);
