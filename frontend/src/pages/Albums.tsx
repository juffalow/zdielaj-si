import React, { useState, Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import { getUserAlbums } from '../api/services';
import Loader from './albums/Loader';
import AlbumsContainer from './albums/AlbumsContainer';
import SEO from '../components/SEO';
import ErrorBoundary from '../components/ErrorBoundary';

async function fetchAlbums(): Promise<Array<Album>> {
  const albums = await getUserAlbums();
  
  return albums;
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Promise<Album[]>>(fetchAlbums());

  return (
    <SEO title="Albumy" description="">
      <Container fluid="xl">
        <ErrorBoundary>
          <Suspense fallback = {<Loader />}>
            <AlbumsContainer fetchAlbums={albums} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </SEO>
  );
}

export default Albums;
