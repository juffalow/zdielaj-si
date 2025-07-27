import { Suspense, useState, useCallback } from 'react';
import type { FunctionComponent } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import UserAlbum from './album/UserAlbum';
import GalleryLoader from './album/GalleryLoader';
import Gallery from './album/Gallery';
import NotFound from './album/NotFound';
import { getAlbum, updateAlbum } from '../api/album';
import useUpload from '../utils/useUpload';
import ErrorBoundary from '../components/ErrorBoundary';

const Album: FunctionComponent = () => {
  const { files } = useUpload();
  const location = useLocation();
  const params = useParams();
  const [album, setAlbum] = useState(location.state?.album);
  
  const updateAlbumAction = useCallback(async (prevState: unknown, state: FormData): Promise<{ name: string, description: string, layout: 'cols' | 'rows' | 'tiles', gaps: 'none' | 'small' | 'medium' | 'large', retention: '1' | '7' | '31' | '366' | '0', changeLayout: boolean }> => {
    const name = state.get('name') as string;
    const description = state.get('description') as string;
    const layout = state.get('layout') as 'cols' | 'rows' | 'tiles';
    const gaps = state.get('gaps') as 'none' | 'small' | 'medium' | 'large';
    const retention = state.get('retention') as '1' | '7' | '31' | '366' | '0';
    const changeLayout = state.get('changeLayout') === 'on';

    await updateAlbum(album.id, { name, description, layout, gaps, retention, changeLayout });

    setAlbum({ ...album, name, description, layout, gaps, retention, changeLayout });

    return { name, description, layout, gaps, retention, changeLayout };
  }, [album]);

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
      <ErrorBoundary notFound={<NotFound />}>
        <Suspense fallback={<GalleryLoader />}>
          <Gallery albumPromise={albumPromise} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default Album;
