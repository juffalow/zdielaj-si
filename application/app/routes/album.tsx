import { Suspense, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
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
  const { user, getUser } = useAuth();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [ albumPromise, setAlbumPromise ] = useState<Promise<Album> | null>(null);

  useEffect(() => {
    if (location.state !== null && typeof location.state.album === 'object') {
      setAlbumPromise(new Promise((resolve) => resolve(location.state.album)));

      window.addEventListener('beforeunload', () => {
        navigate({}, { replace: true, state: null });
      });
    } else {
      setAlbumPromise(async () => {
        const user = await getUser();
        if (user !== null) {
          return getUserAlbum(params.id as string);
        } else {
          return getAlbum(params.id as string);
        }
      });
    }
  }, [ params.id]);

  return (
    <ErrorBoundary notFound={<NotFound />}>
      <Suspense fallback={<GalleryLoader showFormLoader={(location.state !== null && typeof location.state.album === 'object') || (user !== null)} />}>
        {
          albumPromise !== null ? (
            <Gallery albumPromise={albumPromise} />
          ) : null
        }
      </Suspense>
    </ErrorBoundary>
  );
}
