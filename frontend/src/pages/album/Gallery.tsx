import { use, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import GalleryItems from './GalleryItems';
import ShareButton from '../../components/ShareButton';
import Columns from '../../img/columns.png';
import Tiles from '../../img/tiles.png';
import Squares from '../../img/squares.png';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-video.css';

export default function Gallery({ albumPromise }: { albumPromise: Promise<Album> }) {
  const album = use(albumPromise);
  const [ layout, setLayout ] = useState<'cols' | 'rows' | 'tiles'>(album.layout);

  return (
    <div id="zdielaj-si-gallery">
      <title>{album.name || 'Album'}</title>

      <h1 className="text-center">{album.name || 'Album'}</h1>

      {
        album.changeLayout && (
          <div className="text-center mb-2 d-none d-sm-none d-md-block">
            <ButtonGroup aria-label="Basic example">
              <Button variant={layout === 'cols' ? 'secondary' : 'outline-secondary'} className="ps-4 pe-4" onClick={() => setLayout('cols')}><img src={Columns} style={{ width: '1.5rem' }} /></Button>
              <Button variant={layout === 'tiles' ? 'secondary' : 'outline-secondary'} className="ps-4 pe-4" onClick={() => setLayout('tiles')}><img src={Squares} style={{ width: '1.5rem' }} /></Button>
              <Button variant={layout === 'rows' ? 'secondary' : 'outline-secondary'} className="ps-4 pe-4" onClick={() => setLayout('rows')}><img src={Tiles} style={{ width: '1.5rem' }} /></Button>
            </ButtonGroup>
          </div>
        )
      }

      <LightGallery
        plugins={[lgVideo]}
        download={true}
        mobileSettings={{download: true}}
        selector=".gallery-item"
      >
        <GalleryItems files={album.media} layout={layout} gaps={album.gaps} />
      </LightGallery>

      <ShareButton link={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`} />
    </div>
  );
}
