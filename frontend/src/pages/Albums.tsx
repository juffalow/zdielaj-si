import { Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import { getUserAlbums } from '../api/services';
import Loader from './albums/Loader';
import AlbumsContainer from './albums/AlbumsContainer';
import SEO from '../components/SEO';
import ErrorBoundary from '../components/ErrorBoundary';

const Albums: React.FC = () => {
  const albumsPromise = getUserAlbums();

  return (
    <SEO title="Albumy" description="">
      <Container fluid="xl">
        <ErrorBoundary>
          <Suspense fallback = {<Loader />}>
            <AlbumsContainer fetchAlbums={albumsPromise} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </SEO>
  );
}

export default Albums;
