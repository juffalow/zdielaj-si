import { Suspense } from 'react';
import { useParams } from 'react-router';
import NotFound from './album/NotFound';
import GalleryLoader from './album/GalleryLoader';
import Gallery from './album/Gallery';
import { getAlbum } from '../api/album';
import ErrorBoundary from '../components/errorBoundary';

export function meta() {
  return [
    { title: "Album" },
    { name: "description", content: "Album" },
  ];
}

export default function Album() {
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
