import { use, useEffect } from 'react';
import { Card } from '@heroui/react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/functions';
import useOnScreen from '../../utils/useOnScreen';

export default function PublicProfileAlbums({
  fetchAlbums,
  onLastAlbumVisible,
}: {
  fetchAlbums: Promise<Album[]>;
  onLastAlbumVisible: () => void;
}) {
  const albums = use(fetchAlbums);
  const { t } = useTranslation();
  const { measureRef, isIntersecting } = useOnScreen();

  useEffect(() => {
    if (isIntersecting && albums.length === 8) {
      onLastAlbumVisible();
    }
  }, [isIntersecting, albums]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {albums.map((album, index) => (
        <Card key={album.id} className="rounded-sm">
          <Card.Content className="overflow-visible p-0">
            <Link to={`/${t('routes.prefix')}${t('routes.album').replace(':id', album.id)}`}>
              <img
                alt="Card background"
                className="object-cover w-full min-w-full rounded-sm rounded-b-none aspect-square"
                src={album.media[0].thumbnails[0]}
              />
            </Link>
          </Card.Content>
          <Card.Footer className="flex-col">
            <h4 className="font-bold text-large">{album.name}</h4>
            {index === albums.length - 1 && <span ref={measureRef} />}
            <p className="text-default-500">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</p>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
