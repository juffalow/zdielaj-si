import { Suspense, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import NotFound from './album/NotFound';
import GalleryLoader from './album/GalleryLoader';
import Gallery from './album/Gallery';
import { getAlbum, getUserAlbum } from '../api/album';
import ErrorBoundary from '../components/errorBoundary';
import useAuth from '../utils/useAuth';

export function meta() {
  return [
    { title: "Album" },
    { name: "description", content: "Album" },
  ];
}

export default function Album() {
  const { user, hasInitialized } = useAuth();
  const params = useParams();
  const location = useLocation();
  const [ albumPromise, setAlbumPromise ] = useState<Promise<Album> | null>(null);

  if (hasInitialized === false) {
    return <GalleryLoader />;
  }

  useEffect(() => {
    if (location.state !== null && typeof location.state.album === 'object') {
      setAlbumPromise(new Promise((resolve) => resolve(location.state.album)));

      getAlbum(params.id as string).then((album) => {
        setAlbumPromise(
          new Promise((resolve) => resolve(
            Object.assign({}, album, location.state.album)
          ))
        );
      });
    } else {
      if (user !== null) {
        setAlbumPromise(getUserAlbum(params.id as string));
      } else {
        setAlbumPromise(getAlbum(params.id as string));
      }
    }
  }, [user, params.id]);

  return (
    <ErrorBoundary notFound={<NotFound />}>
      <Suspense fallback={<GalleryLoader />}>
        {
          albumPromise !== null ? (
            <Gallery albumPromise={albumPromise} />
          ) : null
        }
      </Suspense>
    </ErrorBoundary>
  );
}
