import { use, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@heroui/react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/functions';
import useOnScreen from '../../utils/useOnScreen';

export default function PublicProfileAlbums({ fetchAlbums, onLastAlbumVisible }: { fetchAlbums: Promise<Album[]>, onLastAlbumVisible: () => void }) {
  const albums = use(fetchAlbums);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { measureRef, isIntersecting } = useOnScreen();

  useEffect(() => {
    if (isIntersecting && albums.length === 8) {
      onLastAlbumVisible();
    }
  }, [isIntersecting, albums]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {
        albums.map((album, index) => (
          <Card key={album.id} radius="sm"isPressable={true} onPress={() => navigate(`/${t("routes.prefix")}${t("routes.album").replace(":id", album.id)}`)}>
            <CardBody className="overflow-visible p-0">
              <Image
                alt="Card background"
                className="object-cover w-full rounded-sm rounded-b-none aspect-square"
                src={album.media[0].thumbnails[0]}
                classNames={{ wrapper: 'min-w-full' }}
              />
            </CardBody>
            <CardFooter className="flex-col">
              <h4 className="font-bold text-large">{album.name}</h4>
              {
                index === albums.length - 1 && (
                  <span ref={measureRef} />
                )
              }
              <p className="text-default-500">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</p>
            </CardFooter>
          </Card>
        ))
      }
    </div>
  );
}
