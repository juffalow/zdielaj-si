import { useRef, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AlbumPreview from './AlbumPreview';

interface Props {
  albums: Album[];
  loadMore: () => Promise<void>;
  isLoading: boolean;
  hasMore: boolean;
  onPublicProfileToggle?: (album: Album) => void;
  onDelete?: (album: Album) => void;
}

const AlbumsList = ({ albums, loadMore, isLoading, hasMore, onPublicProfileToggle, onDelete }: Props) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastAlbumElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore();
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  console.log('Albumslist.albums', albums);

  return (
    <Row>                
      {
        albums.map((album, index) => {
          if (index === albums.length - 1 && hasMore) {
            return (
              <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4" ref={lastAlbumElementRef}>
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
