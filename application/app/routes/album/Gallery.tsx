import { use, useState } from 'react';
import { Divider } from '@heroui/react';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import GalleryItems from './GalleryItems';
import UpdateForm from './UpdateForm';
import useAuth from '../../utils/useAuth';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-video.css';

export default function Gallery({ albumPromise }: { albumPromise: Promise<Album> }) {
  const { user } = useAuth();
  const album = use(albumPromise);
  // const [ layout, setLayout ] = useState<'cols' | 'rows' | 'tiles'>(album.layout);

  return (
    <div id="zdielaj-si-gallery">
      <title>{album.name || 'Album'}</title>

      {
        user !== null && 'user' in album && user.id === album.user.id ? (
          <>
            <UpdateForm album={album} />
            <Divider className="my-10" />
          </>
        ) : null
      }

      {
        typeof album.name === 'string' && album.name.length > 0 ? (
          <h1 className="text-center text-5xl font-bold mb-10">{album.name || 'Album'}</h1>
        ) : null
      }

      <LightGallery
        plugins={[lgVideo]}
        download={true}
        mobileSettings={{download: true}}
        selector=".gallery-item"
      >
        <GalleryItems files={(album as any).media} layout={album.layout} gaps={album.gaps} />
      </LightGallery>
    </div>
  );
}
