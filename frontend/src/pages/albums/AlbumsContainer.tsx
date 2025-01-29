import { use, useState, useOptimistic, startTransition } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AlbumsList from './AlbumsList';
import { deleteAlbum } from '../../api/services';

const AlbumsContainer = ({ fetchAlbums }: { fetchAlbums: Promise<Album[]> }) => {
  const albums = use(fetchAlbums);
  const [ album, setAlbum ] = useState<Album | null>(null);
  const [ deletedAlbums, setDeletedAlbums ] = useState<Album[]>([]);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ optimisticAlbums, deleteOptimisticAlbum ] = useOptimistic(albums.filter(album => !deletedAlbums.some(da => da.id === album.id)), (optimisticAlbums: Album[], deletedAlbum: Album) => {
    return optimisticAlbums.filter(a => a.id !== deletedAlbum.id);
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

    deleteOptimisticAlbum(album);

    await deleteAlbum(album.id);
    setDeletedAlbums((deletedAlbums) => [...deletedAlbums, album]);
  }

  return (
    <>
      {
        optimisticAlbums !== null && optimisticAlbums.length === 0 ? (
          <Alert variant="info">
            Nemáš vytvorené žiadne albumy.
          </Alert>
        ) : null
      }
      <AlbumsList albums={optimisticAlbums} onDelete={onDeleteClick} />

      <Modal show={isModalOpen} onHide={onModalClose} onExited={() => startTransition(() => onModalExit())}>
        <Modal.Header closeButton>
          <Modal.Title>Vymazať album</Modal.Title>
        </Modal.Header>
        <Modal.Body>Naozaj chcete vymazať tento album?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onModalClose}>
            Zatvoriť
          </Button>
          <Button variant="danger" onClick={() => startTransition(() => onModalConfirm())}>
            Vymazať
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlbumsContainer;
