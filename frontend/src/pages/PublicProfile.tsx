import { Suspense } from 'react';
import type { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ErrorBoundary from '../components/ErrorBoundary';
import SEO from '../components/SEO';
import { getPublicProfile, getPublicProfileAlbums } from '../api/services';

import PublicProfileLoader from './publicProfile/PublicProfileLoader';
import PublicProfileContainer from './publicProfile/PublicProfileContainer';
import NotFound from './publicProfile/NotFound';

const PublicProfile: FunctionComponent = () => {
  const params = useParams();
  const albumsPromise = getPublicProfileAlbums({ publicProfileId: params.id as string, first: 8 });
  const publicProfilePromise = getPublicProfile(params.id as string);

  return (
    <SEO title="" description="">
      <Container fluid="xl">
        <ErrorBoundary notFound={<NotFound />}>
          <Suspense fallback = {<PublicProfileLoader />}>
            <PublicProfileContainer fetchAlbums={albumsPromise} fetchPublicProfile={publicProfilePromise} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </SEO>
  );
}

export default PublicProfile;
