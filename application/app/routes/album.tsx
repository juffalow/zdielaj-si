import { Suspense } from 'react';
import { useParams, useLocation } from 'react-router';
import NotFound from './album/NotFound';
import GalleryLoader from './album/GalleryLoader';
import Gallery from './album/Gallery';
import UserAlbum from './album/UserAlbum';
import { getAlbum, getUserAlbum } from '../api/album';
import ErrorBoundary from '../components/errorBoundary';
import useUpload from '../utils/useUpload';
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
  const { files } = useUpload();
  const location = useLocation();

  if (files.length > 0 && location.state.isNew) {
    return (
      <UserAlbum album={{ name: '', description: '', ...location.state.album }} />
    );
  }  

  if (hasInitialized === false) {
    return <GalleryLoader />;
  }

  const albumPromise = user !== null ? getUserAlbum(params.id as string) : getAlbum(params.id as string);

  return (
    <ErrorBoundary notFound={<NotFound />}>
      <Suspense fallback={<GalleryLoader />}>
        <Gallery albumPromise={albumPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
