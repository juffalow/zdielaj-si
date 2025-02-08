import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlbumPreview from './AlbumPreview';
import useOnScreen from '../../utils/useOnScreen';

interface Props {
  albums: Album[];
  loadMore: () => Promise<void>;
  onPublicProfileToggle?: (album: Album) => void;
  onDelete?: (album: Album) => void;
}

const AlbumsList = ({ albums, loadMore, onPublicProfileToggle, onDelete }: Props) => {
  const { measureRef, isIntersecting, observer } = useOnScreen();

  useEffect(() => {
    if (isIntersecting) {
      loadMore();
      observer?.disconnect();
    }
  }, [isIntersecting, loadMore]);

  return (
    <Row>                
      {
        albums.map((album, index) => {
          if (index === albums.length - 1) {
            return (
              <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4" ref={measureRef}>
                <AlbumPreview album={album} onPublicProfileToggle={onPublicProfileToggle} onDelete={onDelete} />
              </Col>
            );
          } else {
            return (
              <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4">
                <AlbumPreview album={album} onPublicProfileToggle={onPublicProfileToggle} onDelete={onDelete} />
              </Col>
            );
          }
        })
      }
    </Row>
  );
}

export default AlbumsList;
