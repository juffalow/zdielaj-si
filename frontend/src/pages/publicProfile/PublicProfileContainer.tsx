import { use, useState, useTransition, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  FaHome,
  FaFacebook,
  FaInstagram,
  FaStrava,
  FaPinterest,
} from 'react-icons/fa';
import AlbumPreview from './AlbumPreview';
import { getPublicProfileAlbums } from '../../api/publicprofiles';
import useOnScreen from '../../utils/useOnScreen';

export default function PublicProfileContainer({ fetchPublicProfile, fetchAlbums }: { fetchPublicProfile: Promise<PublicProfile>, fetchAlbums: Promise<Album[]> }) {
  const publicProfile = use(fetchPublicProfile);
  const albums = use(fetchAlbums);

  const [ allAlbums, setAllAlbums ] = useState<Album[]>(albums);
  const [ page, setPage ] = useState(1);
  const [ hasMore, setHasMore ] = useState(albums.length === 8);

  const [ isLoadingAlbums, startLoadingTransition] = useTransition();

  const { measureRef, isIntersecting, observer } = useOnScreen();

  const loadMore = async (): Promise<void> => {
    if (!hasMore || isLoadingAlbums) {
      return;
    }

    startLoadingTransition(async () => {
      
      const moreAlbums = await getPublicProfileAlbums({  publicProfileId: publicProfile.id, first: 8, after: page * 8 });
      
      setAllAlbums((allAlbums) => [  ...allAlbums, ...moreAlbums ]);
      
      setPage(page + 1);

      setHasMore(moreAlbums.length === 8);
    });
  };

  useEffect(() => {
    if (isIntersecting) {
      loadMore();
    }
  }, [isIntersecting, observer]);

  return (
    <>
      <h1 className="text-center">{publicProfile.name}</h1>
      <p className="text-center" style={{ fontSize: '2rem' }}>
        {
          publicProfile.contact?.homepage && (
            <a href={publicProfile.contact.homepage} className="ms-1 me-1" style={{ color: '#000' }}><FaHome /></a>
          )
        }
        {
          publicProfile.contact?.facebook && (
            <a href={publicProfile.contact.facebook} className="ms-1 me-1" style={{ color: '#000' }}><FaFacebook /></a>
          )
        }
        {
          publicProfile.contact?.instagram && (
            <a href={publicProfile.contact.instagram} className="ms-1 me-1" style={{ color: '#000' }}><FaInstagram /></a>
          )
        }
        {
          publicProfile.contact?.pinterest && (
            <a href={publicProfile.contact.pinterest} className="ms-1 me-1" style={{ color: '#000' }}><FaPinterest /></a>
          )
        }
        {
          publicProfile.contact?.strava && (
            <a href={publicProfile.contact.strava} className="ms-1 me-1" style={{ color: '#000' }}><FaStrava /></a>
          )
        }
      </p>
      <p className="text-center lead">{publicProfile.description}</p>

      <Row>
        {
          allAlbums.map((album, index) => {
            if (index === allAlbums.length - 1 && hasMore) {
              return (
                <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4" ref={measureRef}>
                  <AlbumPreview album={album} />
                </Col>
              );
            } else {
              return (
                <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4">
                  <AlbumPreview album={album} />
                </Col>
              );
            }
          })
        }
      </Row>
    </>
  );
}
