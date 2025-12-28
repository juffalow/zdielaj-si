import { use, useState } from 'react';
import { Divider } from '@heroui/react';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import GalleryItems from './GalleryItems';
import UpdateForm from './UpdateForm';
import MobileBottomButton from './MobileBottomButton';
import FilesRejectionError from './FilesRejectionError';
import useAuth from '../../utils/useAuth';
import useUpload from '../../utils/useUpload';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-video.css';

export default function Gallery({ albumPromise }: { albumPromise: Promise<Album> }) {
  const { user } = useAuth();
  const album = use(albumPromise);
  const { files } = useUpload();
  const [layout] = useState<'cols' | 'rows' | 'tiles'>(album.layout || 'cols');

  return (
    <div id="zdielaj-si-gallery">
      <title>{album.name || 'Album'}</title>

      {files.filter((file: any) => file.hasError === true && file.error.code === 'file-too-large').length > 0 ? (
        <FilesRejectionError code="file-too-large" />
      ) : null}
      {files.filter((file: any) => file.hasError === true && file.error.code === 'too-many-files').length > 0 ? (
        <FilesRejectionError code="too-many-files" />
      ) : null}

      {(user !== null && 'user' in album && user.id === album.user.id) || 'token' in album ? (
        <>
          <UpdateForm album={album} />
          <Divider className="my-10" />
        </>
      ) : null}

      {typeof album.name === 'string' && album.name.length > 0 ? (
        <h1 className="text-center text-5xl font-bold mb-10">{album.name || 'Album'}</h1>
      ) : null}

      <LightGallery plugins={[lgVideo]} download={true} mobileSettings={{ download: true }} selector=".gallery-item">
        <GalleryItems
          files={(album as any).media || (album as any).files || files}
          layout={layout}
          gaps={album.gaps}
          downloadButton={true}
        />
        <GalleryItems files={files} layout={layout} gaps={album.gaps} downloadButton={true} />
      </LightGallery>

      <MobileBottomButton link={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`} />
    </div>
  );
}
