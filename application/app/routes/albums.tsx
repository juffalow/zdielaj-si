import { useEffect, useState, useOptimistic, useCallback, use, startTransition, Suspense } from 'react';
import type { Route } from './+types/albums';
import AlbumsLoader from './albums/loader';
import AlbumsList from './albums/list';
import DeleteModal from './albums/deleteModal';
import { getCurrentUserAlbums, deleteAlbum } from '../api/album';
import ErrorBoundary from '../components/errorBoundary';
import { addAlbumToPublicProfile, removeAlbumFromPublicProfile } from '../api/publicprofiles';
import { getCurrentUser } from '../api/user';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  switch (language) {
    case 'sk':
      return [{ title: 'Albumy | Zdielaj.si' }];
    case 'cz':
      return [{ title: 'Alba | Zdielaj.si' }];
    case 'de':
      return [{ title: 'Alben | Zdielaj.si' }];
    case 'es':
      return [{ title: 'Álbumes | Zdielaj.si' }];
    case 'fr':
      return [{ title: 'Albums | Zdielaj.si' }];
    case 'it':
      return [{ title: 'Album | Zdielaj.si' }];
    case 'pl':
      return [{ title: 'Albumy | Zdielaj.si' }];
    case 'nl':
      return [{ title: 'Albums | Zdielaj.si' }];
    case 'si':
      return [{ title: 'Albumi | Zdielaj.si' }];
    case 'fi':
      return [{ title: 'Albumit | Zdielaj.si' }];
    case 'se':
      return [{ title: 'Album | Zdielaj.si' }];
    case 'no':
      return [{ title: 'Album | Zdielaj.si' }];
    case 'dk':
      return [{ title: 'Album | Zdielaj.si' }];
    case 'hu':
      return [{ title: 'Albumok | Zdielaj.si' }];
    case 'en':
    default:
      return [{ title: 'Albums | Zdielaj.si' }];
  }
}

export default function Albums() {
  const [albumsPromise, setAlbumsPromise] = useState<Promise<Album[]> | null>(null);
  const [userPromise, setUserPromise] = useState<Promise<User> | null>(null);

  useEffect(() => {
    setAlbumsPromise(getCurrentUserAlbums(8));
    setUserPromise(getCurrentUser());
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<AlbumsLoader />}>
        {albumsPromise !== null && userPromise !== null ? (
          <AlbumsContainer albumsPromise={albumsPromise} userPromise={userPromise} />
        ) : null}
      </Suspense>
    </ErrorBoundary>
  );
}

function AlbumsContainer({
  albumsPromise,
  userPromise,
}: {
  albumsPromise: Promise<Album[]>;
  userPromise: Promise<User>;
}) {
  const user = use(userPromise);
  const [albums, setAlbums] = useState<Album[]>(use(albumsPromise));
  const [hasMore, setHasMore] = useState(albums.length === 8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null);

  const [optimisticAlbums, updateOptimisticAlbums] = useOptimistic(
    albums,
    (optimisticAlbums: Album[], action: { album: Album; type: string }): any => {
      if (action.type === 'delete') {
        return optimisticAlbums.filter((a) => a.id !== action.album.id);
      }

      if (action.type === 'publish' || action.type === 'unpublish') {
        return optimisticAlbums.map((a) =>
          a.id === action.album.id
            ? { ...a, publicProfile: action.type === 'publish' ? { id: user?.publicProfileId } : null }
            : a
        );
      }
    }
  );

  const loadMore = useCallback(async (): Promise<void> => {
    if (!hasMore) {
      return;
    }

    startTransition(async () => {
      const moreAlbums = await getCurrentUserAlbums(8, albums.length);

      startTransition(() => {
        setAlbums((allAlbums) => [...allAlbums, ...moreAlbums]);

        setHasMore(moreAlbums.length === 8);
      });
    });
  }, [albums, hasMore]);

  const onPublicProfileToggle = useCallback(async (album: Album) => {
    if ('publicProfile' in album === false || album.publicProfile === null) {
      startTransition(async () => {
        updateOptimisticAlbums({ album, type: 'publish' });
        await addAlbumToPublicProfile(user?.publicProfileId as string, album.id);

        startTransition(() => {
          setAlbums((allAlbums) =>
            allAlbums.map((a) =>
              a.id === album.id ? { ...a, publicProfile: { id: user?.publicProfileId as string } } : a
            )
          );
        });
      });
    } else {
      startTransition(async () => {
        updateOptimisticAlbums({ album, type: 'unpublish' });
        await removeAlbumFromPublicProfile(user?.publicProfileId as string, album.id);

        startTransition(() => {
          setAlbums((allAlbums) => allAlbums.map((a) => (a.id === album.id ? { ...a, publicProfile: null } : a)));
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
      await new Promise((resolve) => setTimeout(resolve, 5_000));
      await deleteAlbum(albumToDelete.id);

      startTransition(() => {
        setAlbums((allAlbums) => allAlbums.filter((a) => a.id !== albumToDelete.id));
      });
    });
  }, [albumToDelete]);

  return (
    <>
      <AlbumsList
        albums={optimisticAlbums}
        onDelete={onDelete}
        onPublicProfileToggle={onPublicProfileToggle}
        onLastAlbumVisible={hasMore ? loadMore : undefined}
      />

      <DeleteModal
        isOpen={isModalOpen}
        onConfirm={onModalConfirm}
        onOpenChange={onModalClose}
        onClose={onModalConfirm}
      />
    </>
  );
}
