import { useEffect, useState, useCallback, Suspense } from 'react';
import { useParams } from 'react-router';
import NotFound from './publicProfile/notFound';
import PublicProfileLoader from './publicProfile/profileLoader';
import PublicProfileAlbumsLoader from './publicProfile/albumsLoader';
import PublicProfileAlbums from './publicProfile/albums';
import Info from './publicProfile/info';
import { getPublicProfile, getPublicProfileAlbums } from '../api/publicprofiles';
import ErrorBoundary from '../components/errorBoundary';

export function meta() {
  return [
    { title: "Public profile" },
    { name: "description", content: "Public profile" },
  ];
}

export default function PublicProfile() {
  const params = useParams();
  const [ albumPromises, setAlbumPromises ] = useState<Promise<Album[]>[]>([]);
  const [ publicProfilePromise, setPublicProfilePromise ] = useState<Promise<PublicProfile> | null>(null);

  useEffect(() => {
    setPublicProfilePromise(getPublicProfile(params.id as string));
  }, [params.id]);

  useEffect(() => {
    setAlbumPromises([ getPublicProfileAlbums({ publicProfileId: params.id as string, first: 8 }) ]);
  }, [params.id]);

  const loadMore = useCallback(() => {
    setAlbumPromises([...albumPromises, getPublicProfileAlbums({ publicProfileId: params.id as string, after: albumPromises.length * 8, first: 8 })]);
  }, [albumPromises, setAlbumPromises]);

  return (
    <ErrorBoundary notFound={<NotFound />}>
      <Suspense fallback={<PublicProfileLoader />}>
        {
          publicProfilePromise !== null ? (
            <Info publicProfilePromise={publicProfilePromise} />
          ) : null
        }
      </Suspense>
      {
        albumPromises.map((albumPromise, index) => {
          return (
            <Suspense key={index} fallback={<PublicProfileAlbumsLoader />}>
              <PublicProfileAlbums fetchAlbums={albumPromise} onLastAlbumVisible={loadMore} />
            </Suspense>
          );
        })
      }
    </ErrorBoundary>
  );
}
