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
    if (file.mimetype.startsWith('image/')) {
      return {
        id: file.id,
        src: file.location,
        thumb: file.thumbnails[0].location,
        downloadUrl: file.location,
      };
    }

    if (file.mimetype.startsWith('video/')) {
      return {
        id: file.id,
        video: {
          source: [{
            src: file.playable.location,
            type: "video/mp4",
          }],
          attributes: {
            preload: false,
            controls: true,
          },
          tracks: [],
        },
        poster: file.thumbnails.find((thumbnail: any) => thumbnail.metadata.width > 400).location,
        thumb: file.thumbnails.find((thumbnail: any) => thumbnail.metadata.width <= 400).location,
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
