import { Suspense } from 'react';
import { useParams, useLocation } from 'react-router';
import NotFound from './album/NotFound';
import GalleryLoader from './album/GalleryLoader';
import Gallery from './album/Gallery';
import UserAlbum from './album/UserAlbum';
import { getAlbum } from '../api/album';
import ErrorBoundary from '../components/errorBoundary';
import useUpload from '../utils/useUpload';

export function meta() {
  return [
    { title: "Album" },
    { name: "description", content: "Album" },
  ];
}

export default function Album() {
  const { files } = useUpload();
  const location = useLocation();

  if (files.length > 0 && location.state.isNew) {
    return (
      <UserAlbum album={location.state.album} updateAlbum={null} />
    );
  }

  const params = useParams();
  const albumPromise = getAlbum(params.id as string);

  return (
    <ErrorBoundary notFound={<NotFound />}>
      <Suspense fallback={<GalleryLoader />}>
        <Gallery albumPromise={albumPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
