import { Suspense } from 'react';
import { useParams } from 'react-router';
import NotFound from './publicProfile/notFound';
import PublicProfileLoader from './publicProfile/loader';
import PublicProfileAlbums from './publicProfile/albums';
import Info from './publicProfile/info';
import { getPublicProfile, getPublicProfileAlbums } from '../api/publicprofiles';
import ErrorBoundary from '../components/errorBoundary';

export function meta() {
  return [
    { title: "Album" },
    { name: "description", content: "Album" },
  ];
}

export default function Album() {
  const params = useParams();
  const albumsPromise = getPublicProfileAlbums({ publicProfileId: params.id as string, first: 8 });
  const publicProfilePromise = getPublicProfile(params.id as string);

  return (
    <ErrorBoundary notFound={<NotFound />}>
      <Suspense fallback={<PublicProfileLoader />}>
        <Info publicProfilePromise={publicProfilePromise} />
        <PublicProfileAlbums fetchAlbums={albumsPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
