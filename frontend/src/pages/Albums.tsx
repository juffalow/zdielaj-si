import { Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import { getUserAlbums, getCurrentUser } from '../api/services';
import Loader from './albums/Loader';
import AlbumsContainer from './albums/AlbumsContainer';
import SEO from '../components/SEO';
import ErrorBoundary from '../components/ErrorBoundary';

const Albums: React.FC = () => {
  const albumsPromise = getUserAlbums();
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
