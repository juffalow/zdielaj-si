import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import 'react-image-gallery/styles/css/image-gallery.css';
import SEO from '../components/SEO';
import { loadAlbum } from '../api/services';
import DownloadIcon from './album/download-icon-new-white.png';
import './album/album.css';

let interval: NodeJS.Timer | null = null;

const Album: React.FC = () => {
  const params = useParams();
  const [ files, setFiles ] = useState([] as Array<any>);
  const [ isReady, setIsReady ] = useState(true);
  const [ hasError, setHasError ] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (interval !== null) {
      return;
    }

    loadData().then((isAlbumReady: boolean) => {
      console.log('useEffect.loadData', isAlbumReady, interval)
      if (!isAlbumReady && interval === null) {
        console.log('wtf?!')
        setIsReady(false);
        interval = setInterval(() => {
          loadData();
        }, 1500);
      }

      if (isAlbumReady) {
        console.log('set isReady to true')
        setIsReady(true);
      }
    });

    return () => clearInterval(interval !== null ? interval : undefined);
  }, []);
  
  useEffect(() => {
    console.log('useEffec, [isReady]', isReady, hasError, interval)
    if ((isReady || hasError) && interval !== null) {
      clearInterval(interval);
    }

  }, [isReady]);

  const loadData = async (): Promise<boolean> => {
    return loadAlbum(String(params.id))
      .then((json) => {
        if (!json.data.album.media.find(m => m.thumbnails.length === 0)) {
          setFiles(json.data.album.media);
          
          return true;
        }

        return false;
      })
      .catch(() => {
        setHasError(true);
        return false;
      });
  }

  const onImageClick = (event: any) => {
    const index = (ref as any).current.getCurrentIndex();
    const element = document.createElement('a');
    element.href = files[index].location;
    element.download = files[index].location.substr(files[index].location.lastIndexOf('/') + 1);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    event.preventDefault();
    return false;
  }

  return (
    <SEO title="" description="">
      <Container>
        {
          hasError ? (
            <Alert variant="danger">
              Tento album už nie je dostupný.
            </Alert>
          ) : null
        }
        {
          !isReady ? (
            <Alert variant="info">
              Médiá budú načítané hneď po vygenerovaní náhladov.
            </Alert>
          ) : null
        }
        {
          files.length > 0 && isReady ? (
            <Row>
              <Col>
                <ImageGallery items={files.map((file) => {
                  if (file.mimetype.startsWith('image/')) {
                    return {
                      original: file.location,
                      thumbnail: file.thumbnails[0].location,
                    };
                  }                  

                  return {
                    original: file.thumbnails.find((thumbnail: any) => thumbnail.width > 400).location,
                    thumbnail: file.thumbnails.find((thumbnail: any) => thumbnail.width <= 400).location,
                  };
                })}
                ref={ref}
                lazyLoad={true}
                showPlayButton={false}
                renderCustomControls={() => {
                  return (
                    <a
                      href=''
                      className='image-gallery-download-button'
                      onClick={onImageClick}
                    >
                      <img src={DownloadIcon} style={{ maxWidth: '100%' }} />
                    </a>
                  )
                }} />
              </Col>
            </Row>
          ) : null
        }
      </Container>
    </SEO>
  );
}

export default Album;
