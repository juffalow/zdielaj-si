import { use, useState } from 'react';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import GalleryItems from './GalleryItems';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-video.css';

export default function Gallery({ albumPromise }: { albumPromise: Promise<Album> }) {
  const album = use(albumPromise);
  // const [ layout, setLayout ] = useState<'cols' | 'rows' | 'tiles'>(album.layout);

  return (
    <div id="zdielaj-si-gallery">
      <title>{album.name || 'Album'}</title>

      {
        typeof album.name === 'string' && album.name.length > 0 ? (
          <h1 className="text-center text-5xl font-bold">{album.name || 'Album'}</h1>
        ) : null
      }

      <LightGallery
        plugins={[lgVideo]}
        download={true}
        mobileSettings={{download: true}}
        selector=".gallery-item"
        elementClassNames='mt-10'
      >
        <GalleryItems files={(album as any).media} layout={album.layout} gaps={album.gaps} />
      </LightGallery>
    </div>
  );
}
