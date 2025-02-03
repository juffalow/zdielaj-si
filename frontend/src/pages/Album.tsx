import { Suspense, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import UserAlbum from './album/UserAlbum';
import GalleryLoader from './album/GalleryLoader';
import Gallery from './album/Gallery';
import { getAlbum, updateAlbum } from '../api/services';
import useUpload from '../utils/useUpload';
import ErrorBoundary from '../components/ErrorBoundary';

const Album: React.FC = () => {
  const { files } = useUpload();
  const location = useLocation();
  const params = useParams();
  const [album, setAlbum] = useState(location.state?.album);
  
  const updateAlbumAction = async (prevState: unknown, state: FormData): Promise<{ name: string, description: string }> => {
    const name = state.get('name') as string;
    const description = state.get('description') as string;

    await updateAlbum(album.id, { name, description });

    setAlbum({ ...album, name, description });

    return { name, description };
  }

  if (files.length > 0 && location.state.isNew) {
    return (
      <Container fluid>
        <UserAlbum  album={album} updateAlbum={updateAlbumAction} />
      </Container>
    );
  }

  const albumPromise = getAlbum(params.id as string);

  return (
    <Container fluid>
      <ErrorBoundary>
        <Suspense fallback={<GalleryLoader />}>
          <Gallery albumPromise={albumPromise} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default Album;
