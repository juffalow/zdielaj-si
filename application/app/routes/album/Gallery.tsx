import { use, useState } from 'react';
import GalleryItems from './GalleryItems';

export default function Gallery({ albumPromise }: { albumPromise: Promise<Album> }) {
  const album = use(albumPromise);
  // const [ layout, setLayout ] = useState<'cols' | 'rows' | 'tiles'>(album.layout);

  return (
    <div id="zdielaj-si-gallery">
      <title>{album.name || 'Album'}</title>

      {
        typeof album.name === 'string' && album.name.length > 0 ? (
          <h1 className="text-center">{album.name || 'Album'}</h1>
        ) : null
      }

      <GalleryItems files={(album as any).media} layout={album.layout} gaps={album.gaps} />
    </div>
  );
}
