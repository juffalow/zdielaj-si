import {
  useState,
  useOptimistic,
  Suspense,
  useCallback,
  startTransition,
  use,
} from 'react';
import AlbumsLoader from './albums/loader';
import AlbumsList from './albums/list';
import { getCurrentUserAlbums, deleteAlbum } from '../api/album';
import ErrorBoundary from '../components/errorBoundary';
import { addAlbumToPublicProfile, removeAlbumFromPublicProfile } from '../api/publicprofiles';
import DeleteModal from './albums/deleteModal';

export function meta() {
  return [
    { title: "Albums | Zdielaj.si" },
    { name: "description", content: "Albums" },
  ];
}

export default function Albums() {
  const albumsPromise = getCurrentUserAlbums(8);

  return (
    <ErrorBoundary>
      <Suspense fallback={<AlbumsLoader />}>
        <AlbumsContainer albumsPromise={albumsPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

function AlbumsContainer({ albumsPromise }: { albumsPromise: Promise<Album[]> }) {
  const [ albums, setAlbums ] = useState<Album[]>(use(albumsPromise));
  const [ hasMore, setHasMore ] = useState(albums.length === 8);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ albumToDelete, setAlbumToDelete ] = useState<Album | null>(null);

  const user = { publicProfileId: 'test-profile-5' };

  const [ optimisticAlbums, updateOptimisticAlbums ] = useOptimistic(albums, (optimisticAlbums: Album[], action: { album: Album, type: string }): any => {
    if (action.type === 'delete') {
      return optimisticAlbums.filter(a => a.id !== action.album.id);
    }

    if (action.type === 'publish' || action.type === 'unpublish') {
      return optimisticAlbums.map(a => a.id === action.album.id ?
        { ...a, publicProfile: action.type === 'publish' ?
          { id: user?.publicProfileId } : null } : a);
    }
  });

  const loadMore = useCallback(async (): Promise<void> => {
    if (!hasMore) {
      return;
    }

    startTransition(async () => {
      const moreAlbums = await getCurrentUserAlbums(8, albums.length);

      startTransition(() => {
        setAlbums((allAlbums) => [  ...allAlbums, ...moreAlbums ]);
      
        setHasMore(moreAlbums.length === 8);
      });
    });
  }, [ albums, hasMore ]);

  const onPublicProfileToggle = useCallback(async (album: Album) => {
    if ('publicProfile' in album === false || album.publicProfile === null) {
      startTransition(async () => {
        updateOptimisticAlbums({ album, type: 'publish' });
        await addAlbumToPublicProfile(user?.publicProfileId as string, album.id);

        startTransition(() => {
          setAlbums((allAlbums) => allAlbums.map(a => a.id === album.id ? { ...a, publicProfile: { id: user?.publicProfileId as string } } : a));
        });
      });
    } else {
      startTransition(async () => {
        updateOptimisticAlbums({ album, type: 'unpublish' });
        await removeAlbumFromPublicProfile(user?.publicProfileId as string, album.id);

        startTransition(() => {
          setAlbums((allAlbums) => allAlbums.map(a => a.id === album.id ? { ...a, publicProfile: null } : a));
        });
      });
    }
  }, []);

  const onDelete = useCallback(async (album: Album) => {
    startTransition(() => {
      setIsModalOpen(true);
      setAlbumToDelete(album);
    });
  }, []);

  const onModalClose = useCallback(() => {
    startTransition(() => {
      setAlbumToDelete(null);
      setIsModalOpen(false);
    });
  }, []);

  const onModalConfirm = useCallback(() => {
    if (albumToDelete === null) {
      return;
    }

    updateOptimisticAlbums({ album: albumToDelete, type: 'delete' });
    setAlbumToDelete(null);
    setIsModalOpen(false);

    startTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 5_000));
      await deleteAlbum(albumToDelete.id);

      startTransition(() => {
        setAlbums((allAlbums) => allAlbums.filter(a => a.id !== albumToDelete.id));
      });
    });
  }, [ albumToDelete ]);

  return (
    <>
      <AlbumsList albums={optimisticAlbums} onDelete={onDelete} onPublicProfileToggle={onPublicProfileToggle} onLastAlbumVisible={hasMore ? loadMore : undefined} />

      <DeleteModal isOpen={isModalOpen} onConfirm={onModalConfirm} onOpenChange={onModalClose} onClose={onModalConfirm} />
    </>
  );
}
