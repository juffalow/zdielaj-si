import { use, useState, useCallback, useOptimistic, startTransition, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AlbumsList from './AlbumsList';
import { getCurrentUserAlbums, deleteAlbum } from '../../api/album';
import { addAlbumToPublicProfile, removeAlbumFromPublicProfile } from '../../api/publicprofiles';

const AlbumsContainer = ({ fetchAlbums, fetchUser }: { fetchAlbums: Promise<Album[]>, fetchUser: Promise<User> }) => {
  const { t } = useTranslation();
  const albums = use(fetchAlbums);
  const user = use(fetchUser);

  const [ page, setPage ] = useState(1);
  const [ hasMore, setHasMore ] = useState(albums.length === 8);
  const [ allAlbums, setAllAlbums ] = useState<Album[]>(albums);

  const [ isLoadingAlbums, startLoadingTransition] = useTransition();

  const [ album, setAlbum ] = useState<Album | null>(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ optimisticAlbums, updateOptimisticAlbums ] = useOptimistic(allAlbums, (optimisticAlbums: Album[], action: { album: Album, type: string }): any => {
    if (action.type === 'delete') {
      return optimisticAlbums.filter(a => a.id !== action.album.id);
    }

    if (action.type === 'publish' || action.type === 'unpublish') {
      return optimisticAlbums.map(a => a.id === action.album.id ? { ...a, publicProfile: action.type === 'publish' ? { id: user?.publicProfileId } : null } : a);
    }
  });

  const onDeleteClick = useCallback((album: Album) => {
    setIsModalOpen(true);
    setAlbum(album);
  }, []);

  const onModalClose = () => {
    setAlbum(null);
    setIsModalOpen(false);
  }

  const onModalConfirm = async () => {
    setIsModalOpen(false);
  }

  const onModalExit = async () => {
    if (album === null) {
      return;
    }

    updateOptimisticAlbums({ album, type: 'delete' });

    await deleteAlbum(album.id);
    setAllAlbums((allAlbums) => allAlbums.filter(a => a.id !== album.id));
  }

  const onPublicProfileToggle = useCallback(async (album: Album) => {
    startTransition(async () => {
      if ('publicProfile' in album === false || album.publicProfile === null) {
        updateOptimisticAlbums({ album, type: 'publish' });
        await addAlbumToPublicProfile(user?.publicProfileId as string, album.id);
        setAllAlbums((allAlbums) => allAlbums.map(a => a.id === album.id ? { ...a, publicProfile: { id: user?.publicProfileId as string } } : a));

      } else {
        updateOptimisticAlbums({ album, type: 'unpublish' });
        await removeAlbumFromPublicProfile(user?.publicProfileId as string, album.id);
        setAllAlbums((allAlbums) => allAlbums.map(a => a.id === album.id ? { ...a, publicProfile: null } : a));
      }
    });
  }, []);

  const loadMore = useCallback(async (): Promise<void> => {
    if (!hasMore) {
      return;
    }

    startLoadingTransition(async () => {
      const moreAlbums = await getCurrentUserAlbums(8, page * 8);
      
      setAllAlbums((allAlbums) => [  ...allAlbums, ...moreAlbums ]);
      
      setPage(page + 1);

      setHasMore(moreAlbums.length === 8);
    });
  }, [ page, hasMore ]);

  return (
    <>
      {
        optimisticAlbums !== null && optimisticAlbums.length === 0 ? (
          <Alert variant="info">
            {t("albums.albumsContainer.noAlbumsAlert")}
          </Alert>
        ) : null
      }
      <AlbumsList albums={optimisticAlbums} loadMore={loadMore} hasMore={hasMore} isLoading={isLoadingAlbums} onPublicProfileToggle={onPublicProfileToggle} onDelete={onDeleteClick} />

      <Modal show={isModalOpen} onHide={onModalClose} onExited={() => startTransition(() => onModalExit())}>
        <Modal.Header closeButton>
          <Modal.Title>{t("albums.albumsContainer.modalTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("albums.albumsContainer.modalBody")}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onModalClose}>
            {t("albums.albumsContainer.modalCloseButton")}
          </Button>
          <Button variant="danger" onClick={() => startTransition(() => onModalConfirm())}>
            {t("albums.albumsContainer.modalSubmitButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlbumsContainer;
