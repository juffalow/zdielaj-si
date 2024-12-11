import { useLayoutEffect, useState, useRef, useEffect } from 'react'
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import GalleryItems from './GalleryItems';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-video.css';

export default function Gallery({ files }: { files: Array<Media> }) {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [innerWidth, setInnderWidth] = useState(window.document.getElementById("zdielaj-si-gallery")?.clientWidth || window.innerWidth);
  const [cols, setCols] = useState(innerWidth < 768 ? 2 : innerWidth < 992 ? 2 : innerWidth < 1200 ? 4 : innerWidth < 1600 ? 6 : 6);
  let setRecentChanges: NodeJS.Timeout | undefined = undefined;

  useLayoutEffect(() => {
    function updateSize() {
      clearTimeout(setRecentChanges);

      setRecentChanges = setTimeout(() => {
        const galleryWidth = galleryRef.current?.offsetWidth || window.innerWidth;
        setInnderWidth(galleryWidth);
        setCols(galleryWidth < 768 ? 2 : galleryWidth < 992 ? 2 : galleryWidth < 1200 ? 4 : galleryWidth < 1600 ? 6 : 6);
      }, 200);
    }
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    setInnderWidth(galleryRef.current?.offsetWidth || window.innerWidth);
  }, [ galleryRef ]);

  return (
    <div id="zdielaj-si-gallery" ref={galleryRef}>
      <LightGallery
        plugins={[lgVideo]}
        download={true}
        mobileSettings={{download: true}}
        selector=".gallery-item"
      >
        <GalleryItems files={files} cols={cols} innerWidth={innerWidth} />
      </LightGallery>
    </div>
  );
}
