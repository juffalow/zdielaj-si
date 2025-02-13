import { memo } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ImageLoader from '../../components/ImageLoader';
import { formatDate } from '../../utils/functions';

interface Props {
  album: Album;
}

const AlbumPreview: FunctionComponent<Props> = ({ album }: Props) => {
  const { t } = useTranslation();
  return (
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
        <div className="d-grid">
          <Link className="btn btn-outline-secondary" role="button" to={`/album/${album.id}`}>{t("albums.albumPreview.show")}</Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default memo(AlbumPreview);
