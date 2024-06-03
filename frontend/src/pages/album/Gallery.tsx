import { useRef, useState, useCallback } from 'react';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgVideo from 'lightgallery/plugins/video';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

function Gallery({ files }: any) {
  const lightGallery = useRef<any>(null);
  const [container, setContainer] = useState(null);

  const elements = files.map((file: any) => {
    const srcset = file.thumbnails.map((t: any) => `${t.location} ${t.metadata.width}w`)
      .concat(`${file.location} ${file.metadata.width}w`).join(',');

    if (file.mimetype.startsWith('image/')) {
      return {
        id: file.id,
        src: file.location,
        srcset,
        // srcset: file.thumbnails.map((t: any) => `${t.location} ${t.metadata.width}w`).join(','),
        // responsive: file.thumbnails.map((t: any) => `${t.location} ${t.metadata.width}w`).join(','),
        // sizes: file.thumbnails.map((t: any) => `${t.location} ${t.metadata.width}`).join(','),
        // thumb: file.thumbnails[0].location,
        thumb: file.location,
        downloadUrl: file.location,
      };
    }

    if (file.mimetype.startsWith('video/')) {
      return {
        id: file.id,
        video: {
          source: [{
            src: file.thumbnails[0].location,
            type: 'video/mp4',
          }],
          attributes: {
            preload: false,
            controls: true,
          },
          tracks: [],
        },
        poster: file.thumbnails.filter((thumbnail: any) => thumbnail.mimetype.startsWith('image/')).find((thumbnail: any) => thumbnail.metadata.width > 400).location,
        thumb: file.thumbnails.filter((thumbnail: any) => thumbnail.mimetype.startsWith('image/')).find((thumbnail: any) => thumbnail.metadata.width <= 400).location,
        downloadUrl: file.location,
      };
    }
  });

  const setContainerRef = useCallback((node: any) => {
    if (node !== null) {
      setContainer(node);
    }
  }, []);

  const getLgComponent = () => {
    if (container !== null) {
      return (
        <LightGallery
          plugins={[lgThumbnail, lgVideo]}
          closable={false}
          download={true}
          mobileSettings={{download: true}}
          thumbnail={true}
          showMaximizeIcon={true}
          dynamic={true}
          dynamicEl={elements}
          onInit={onInit}
          index={0}
          container={container}
        />
      );
    }
    return null;
  };

  const onInit = useCallback((detail: any) => {
    if (detail) {
      lightGallery.current = detail.instance;
      lightGallery.current.openGallery();
    }
  }, []);

  return (
    <div>
      <div
        style={{ paddingBottom: '50%' }}
        ref={setContainerRef}
      ></div>
      {getLgComponent()}
    </div>
  );
}

export default Gallery;
