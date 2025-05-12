import { Suspense } from 'react';
import type { FunctionComponent } from 'react'; 
import Container from 'react-bootstrap/Container';
import Loader from './albums/Loader';
import AlbumsContainer from './albums/AlbumsContainer';
import SEO from '../components/SEO';
import ErrorBoundary from '../components/ErrorBoundary';
import useAuth from '../utils/useAuth';
import { getCurrentUserAlbums } from '../api/album';
import { getCurrentUser } from '../api/user';
import retryOperation from '../utils/retryPromise';

const Albums: FunctionComponent = () => {
  const { user, refreshSession } = useAuth();
  const albumsPromise = retryOperation(() => getCurrentUserAlbums(8), { retries: 3, onUnauthorized: refreshSession });
  const userPromise = retryOperation(() => getCurrentUser(user?.accessToken as string), { retries: 3, onUnauthorized: refreshSession });
  
  return (
    <SEO title="Albumy" description="">
      <Container fluid="xl">
        <ErrorBoundary>
          <Suspense fallback = {<Loader />}>
            <AlbumsContainer fetchAlbums={albumsPromise} fetchUser={userPromise} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </SEO>
  );
}

export default Albums;
