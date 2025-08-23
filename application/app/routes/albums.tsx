import { Suspense } from 'react';
import NotFound from './albums/notFound';
import AlbumsLoader from './albums/loader';
import AlbumsList from './albums/list';
import { getCurrentUserAlbums } from '../api/album';
import ErrorBoundary from '../components/errorBoundary';

export function meta() {
  return [
    { title: "Albums | Zdielaj.si" },
    { name: "description", content: "Albums" },
  ];
}

export default function Albums() {
  console.log('Albums');
  const albumsPromise = getCurrentUserAlbums(8);

  return (
    <ErrorBoundary notFound={<NotFound />}>
      <Suspense fallback={<AlbumsLoader />}>
        <AlbumsList albumsPromise={albumsPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
