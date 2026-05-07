import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Alert, Button, Switch, Label } from '@heroui/react';
import { IoTrashSharp } from 'react-icons/io5';
import { formatDate } from '../../utils/functions';
import noPreview from '../../images/nopreview.jpg';
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
  const { i18n, t } = useTranslation();
  const { measureRef, isIntersecting } = useOnScreen();

  if (albums.length === 0) {
    return (
      <Alert status="accent">
        <Alert.Content>
          <Alert.Title className="text-2xl">
            {t('albums.noAlbumsInfo.title')}
          </Alert.Title>
          <Alert.Description className="mt-2">
            {t('albums.noAlbumsInfo.subtitle')}
          </Alert.Description>
          <Link
            to={`/${i18n.language}/${t('routes.home')}`}
            className="button bg-blue-200 hover:bg-blue-300 w-100 mx-auto"
            data-tracking-id="albums_alert_button_click"
          >
            {t('albums.noAlbumsInfo.ctaButton')}
          </Link>
        </Alert.Content>
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
        <div
          key={album.id}
          className="bg-white rounded-sm"
        >
          <div className="overflow-visible p-0 relative">
            <Button
              isIconOnly
              aria-label="Like"
              variant="danger"
              className="absolute top-2 right-2 z-1"
              onPress={() => onDelete(album)}
              data-tracking-id="albums_list_delete_button_click"
            >
              <IoTrashSharp />
            </Button>
            {album.media.length > 0 ? (
              <Link to={`/${t('routes.prefix')}${t('routes.album').replace(':id', album.id)}`}>
                <img
                  alt="Card background"
                  className="object-cover w-full 'min-w-full rounded-sm rounded-b-none aspect-square z-0"
                  src={album.media[0].thumbnails[0]}
                  onError={(e) => {
                    e.currentTarget.src = noPreview;
                  }}
                />
              </Link>
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-sm rounded-b-none aspect-square" />
            )}
          </div>
          <div className="flex-col p-4 text-center">
            <h4 className="font-bold text-large">{album.name}</h4>
            {index === albums.length - 1 && typeof onLastAlbumVisible === 'function' && <span ref={measureRef} />}
            <p className="text-default-500">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</p>
            <Switch
              defaultSelected={typeof album.publicProfile === 'object' && album.publicProfile !== null}
              onChange={() => onPublicProfileToggle(album)}
              className="mt-2"
            >
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Content>
                <Label className="text-base">{t('albums.list.publicProfileSwitch')}</Label>
              </Switch.Content>
            </Switch>
          </div>
        </div>
      ))}
    </div>
  );
}
