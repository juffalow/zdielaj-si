import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Alert, Button, Card, CardBody, CardFooter, Image, Switch } from '@heroui/react';
import { useNavigate } from 'react-router';
import { IoTrashSharp } from 'react-icons/io5';
import { formatDate } from '../../utils/functions';
import noPreview from '../../images/nopreview.png';
import useOnScreen from '../../utils/useOnScreen';

export default function AlbumsList({
  albums,
  onDelete,
  onPublicProfileToggle,
  onLastAlbumVisible,
}: {
  albums: Album[];
  onDelete: (album: Album) => void;
  onPublicProfileToggle: (album: Album) => void;
  onLastAlbumVisible?: () => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { measureRef, isIntersecting } = useOnScreen();

  if (albums.length === 0) {
    return (
      <Alert color="primary" hideIcon={true}>
        <h1 className="text-center mb-2 text-2xl w-full">{t('albums.noAlbumsInfo.title')}</h1>
        <p className="text-center mb-2 text-lg w-full">{t('albums.noAlbumsInfo.subtitle')}</p>
        <Button
          as={Link}
          to={`/${t('routes.prefix')}${t('routes.home')}`}
          variant="bordered"
          color="primary"
          className="w-100 mx-auto"
          data-tracking-id="albums_alert_button_click"
        >
          {t('albums.noAlbumsInfo.ctaButton')}
        </Button>
      </Alert>
    );
  }

  useEffect(() => {
    if (isIntersecting && typeof onLastAlbumVisible === 'function') {
      onLastAlbumVisible();
    }
  }, [isIntersecting, albums]);

  return (
    <div className="grid ggrid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {albums.map((album, index) => (
        <Card
          as="a"
          key={album.id}
          radius="sm"
          isPressable={true}
          onPress={() => navigate(`/${t('routes.prefix')}${t('routes.album').replace(':id', album.id)}`)}
        >
          <CardBody className="overflow-visible p-0">
            <Button
              isIconOnly
              aria-label="Like"
              variant="ghost"
              color="danger"
              className="absolute top-2 right-2 z-1"
              onPress={() => onDelete(album)}
            >
              <IoTrashSharp />
            </Button>
            {album.media.length > 0 ? (
              <Image
                alt="Card background"
                className="object-cover w-full rounded-sm rounded-b-none aspect-square z-0"
                src={album.media[0].thumbnails[0]}
                fallbackSrc={noPreview}
                classNames={{ wrapper: 'min-w-full' }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-sm rounded-b-none aspect-square" />
            )}
          </CardBody>
          <CardFooter className="flex-col">
            <h4 className="font-bold text-large">{album.name}</h4>
            {index === albums.length - 1 && typeof onLastAlbumVisible === 'function' && <span ref={measureRef} />}
            <p className="text-default-500">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</p>
            <Switch
              className="mt-2"
              size="sm"
              defaultSelected={typeof album.publicProfile === 'object' && album.publicProfile !== null}
              onValueChange={() => onPublicProfileToggle(album)}
            >
              {t('albums.list.publicProfileSwitch')}
            </Switch>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
