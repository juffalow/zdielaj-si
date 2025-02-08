import { use, useState, useOptimistic, startTransition } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AlbumsList from './AlbumsList';
import {
  deleteAlbum,
  addAlbumToPublicProfile,
  removeAlbumFromPublicProfile,
  getUserAlbums,
} from '../../api/services';

const AlbumsContainer = ({ fetchAlbums, fetchUser }: { fetchAlbums: Promise<Album[]>, fetchUser: Promise<User> }) => {
  const { t } = useTranslation();
  const albums = use(fetchAlbums);
  const user = use(fetchUser);

  const [ page, setPage ] = useState(1);
  const [ hasMore, setHasMore ] = useState(albums.length === 10);
  const [ allAlbums, setAllAlbums ] = useState<Album[]>(albums);

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

  const onDeleteClick = async (album: Album) => {
    setIsModalOpen(true);
    setAlbum(album);
  }

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

  const onPublicProfileToggle = async (album: Album) => {
    startTransition(async () => {
      if (album.publicProfile === null) {
        updateOptimisticAlbums({ album, type: 'publish' });
        await addAlbumToPublicProfile(user?.publicProfileId as string, album.id);
        setAllAlbums((allAlbums) => allAlbums.map(a => a.id === album.id ? { ...a, publicProfile: { id: user?.publicProfileId as string } } : a));

      } else {
        updateOptimisticAlbums({ album, type: 'unpublish' });
        await removeAlbumFromPublicProfile(user?.publicProfileId as string, album.id);
        setAllAlbums((allAlbums) => allAlbums.map(a => a.id === album.id ? { ...a, publicProfile: null } : a));
      }
    });
  }

  const loadMore = async (): Promise<void> => {
    if (!hasMore) {
      return;
    }
    
    const moreAlbums = await getUserAlbums(user, 10, page * 10);

    setAllAlbums((allAlbums) => [  ...allAlbums, ...moreAlbums ]);

    setPage(page + 1);
    setHasMore(moreAlbums.length === 10);
  }

  return (
    <>
      {
        optimisticAlbums !== null && optimisticAlbums.length === 0 ? (
          <Alert variant="info">
            {t("albums.albumsContainer.noAlbumsAlert")}
          </Alert>
        ) : null
      }
      <AlbumsList albums={optimisticAlbums} loadMore={loadMore} onPublicProfileToggle={onPublicProfileToggle} onDelete={onDeleteClick} />

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
