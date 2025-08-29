import { useState, useEffect, Suspense, useCallback } from 'react';
import NotFound from './albums/notFound';
import AlbumsLoader from './albums/loader';
import AlbumsList from './albums/list';
import { getCurrentUserAlbums } from '../api/album';
import ErrorBoundary from '../components/errorBoundary';
import useAuth from '../utils/useAuth';

export function meta() {
  return [
    { title: "Albums | Zdielaj.si" },
    { name: "description", content: "Albums" },
  ];
}

export default function Albums() {
  const { user } = useAuth();
  const [ albumPromises, setAlbumPromises ] = useState<Promise<Album[]>[]>([]);

  useEffect(() => {
    if (user !== null) {
      setAlbumPromises([ getCurrentUserAlbums(8) ]);
    }
  }, [user]);

  const loadMore = useCallback(() => {
    setAlbumPromises([...albumPromises, getCurrentUserAlbums(8, albumPromises.length * 8)]);
  }, [albumPromises, setAlbumPromises]);

  return (
    <ErrorBoundary notFound={<NotFound />}>
      {
        albumPromises.map((albumPromise, index) => {
          return (
            <Suspense key={index} fallback={<AlbumsLoader />}>
              <AlbumsList albumsPromise={albumPromise} onLastAlbumVisible={loadMore} />
            </Suspense>
          );
        })
      }
    </ErrorBoundary>
  );
}
