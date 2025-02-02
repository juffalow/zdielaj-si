import { use, useState, useOptimistic, startTransition } from 'react';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AlbumsList from './AlbumsList';
import { deleteAlbum, addAlbumToPublicProfile, removeAlbumFromPublicProfile } from '../../api/services';

const AlbumsContainer = ({ fetchAlbums }: { fetchAlbums: Promise<Album[]> }) => {
  const albums = use(fetchAlbums);

  const [ allAlbums, setAllAlbums ] = useState<Album[]>(albums);

  const [ album, setAlbum ] = useState<Album | null>(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ optimisticAlbums, updateOptimisticAlbums ] = useOptimistic(allAlbums, (optimisticAlbums: Album[], action: { album: Album, type: string }): any => {
    if (action.type === 'delete') {
      return optimisticAlbums.filter(a => a.id !== action.album.id);
    }

    if (action.type === 'publish' || action.type === 'unpublish') {
      return optimisticAlbums.map(a => {
        if (a.id === action.album.id) {
          return {
            ...a,
            publicProfile: action.type === 'publish' ? { id: 'public-profile-1' } : null,
          };
        }

        return a;
      });
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
      console.log('onPublicProfileToggle', album);

      if (album.publicProfile === null) {
        console.log('publishing');
        updateOptimisticAlbums({ album, type: 'publish' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await addAlbumToPublicProfile('public-profile-1', album.id);
        setAllAlbums((allAlbums) => allAlbums.map(a => {
          if (a.id === album.id) {
            return {
              ...a,
              publicProfile: { id: 'public-profile-1' },
            };
          }

          return a;
        }));
      } else {
        console.log('unpublishing');
        updateOptimisticAlbums({ album, type: 'unpublish' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await removeAlbumFromPublicProfile('public-profile-1', album.id);

        setAllAlbums((allAlbums) => allAlbums.map(a => {
          if (a.id === album.id) {
            return {
              ...a,
              publicProfile: null,
            };
          }

          return a;
        }));
      }
  
      console.log('done');
    });
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
      <AlbumsList albums={optimisticAlbums} onPublicProfileToggle={onPublicProfileToggle} onDelete={onDeleteClick} />

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
