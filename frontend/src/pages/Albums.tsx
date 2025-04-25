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

const Albums: FunctionComponent = () => {
  const { user } = useAuth();
  const albumsPromise = getCurrentUserAlbums(8);
  const userPromise = getCurrentUser(user?.accessToken as string);
  
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
