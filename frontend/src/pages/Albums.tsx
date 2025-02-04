import { Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import { getUserAlbums, getCurrentUser } from '../api/services';
import Loader from './albums/Loader';
import AlbumsContainer from './albums/AlbumsContainer';
import SEO from '../components/SEO';
import ErrorBoundary from '../components/ErrorBoundary';
import useAuth from '../utils/useAuth';

const Albums: React.FC = () => {
  const { user } = useAuth();
  const albumsPromise = getUserAlbums(user as User);
  const userPromise = getCurrentUser();

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
