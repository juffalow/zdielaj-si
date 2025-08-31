import { use, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@heroui/react';
import { useNavigate } from 'react-router';
import { formatDate } from '../../utils/functions';
import noPreview from '../../images/nopreview.png';
import useOnScreen from '../../utils/useOnScreen';

export default function AlbumsList({ albumsPromise, onLastAlbumVisible }: { albumsPromise: Promise<Album[]>, onLastAlbumVisible: () => void }) {
  const { t } = useTranslation();
  const albums = use(albumsPromise);
  const navigate = useNavigate();
  const { measureRef, isIntersecting } = useOnScreen();

  if (albums.length === 0) {
    return (
      <Alert color="primary" hideIcon={true}>
        <h1 className="text-center mb-2 text-2xl w-full">{t("albums.noAlbumsInfo.title")}</h1>
        <p className="text-center mb-2 text-lg w-full">{t("albums.noAlbumsInfo.subtitle")}</p>
        <Button as={Link} to={`/${t("routes.prefix")}${t("routes.home")}`} variant="bordered" color="primary" className="w-100 mx-auto" data-tracking-id="albums_alert_button_click">{t("albums.noAlbumsInfo.ctaButton")}</Button>
      </Alert>
    );
  }

  useEffect(() => {
    if (isIntersecting && albums.length === 8) {
      onLastAlbumVisible();
    }
  }, [isIntersecting, albums]);

  return (
    <div className="grid ggrid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {
        albums.map((album, index) => (
          <Card key={album.id} radius="sm" isPressable={true} onPress={() => navigate(`/${t("routes.prefix")}${t("routes.album").replace(":id", album.id)}`)}>
            <CardBody className="overflow-visible p-0">
              {
                album.media.length > 0 ? (
                <Image
                  alt="Card background"
                  className="object-cover w-full rounded-sm rounded-b-none aspect-square"
                  src={album.media[0].thumbnails[0]}
                  fallbackSrc={noPreview}
                  classNames={{ wrapper: 'min-w-full' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-sm rounded-b-none aspect-square" />
              )
            }
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
