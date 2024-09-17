import { useLayoutEffect, useState, useRef, useEffect } from 'react'
import Image from 'react-bootstrap/Image';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import ImageLoader from '../../components/ImageLoader';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-video.css';

export default function Gallery({ files }: { files: Array<Media> }) {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [innerWidth, setInnderWidth] = useState(window.document.getElementById("zdielaj-si-gallery")?.clientWidth || window.innerWidth);
  const [cols, setCols] = useState(innerWidth < 768 ? 2 : innerWidth < 992 ? 2 : innerWidth < 1200 ? 4 : innerWidth < 1600 ? 6 : 6);
  const [ galleryHeight, setGalleryHeight ] = useState(0);
  const [ galleryWidth, setGalleryWidth ] = useState('100%');
  const space = 20;
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

  const renderPictures = (files: Array<Media>, innerWidth: number, cols: number) => {
    let left = 0;
    const width = (innerWidth - (space * (cols - 1))) / cols;
    const newGalleryWidth = files.length > cols ? '100%' : files.length * width + (space * (files.length - 1)) + 'px';
    if (galleryWidth !== newGalleryWidth) setGalleryWidth(newGalleryWidth);
    const top = Array(cols).fill(0);

    const elements = files.map((file, index) => {
      { left += width + 20 }
      { index % cols === 0 && (left = 0) }

      const element = (
        <div key={file.id} className="gallery-item mb-4" data-src={file.location} style={{ position: 'absolute', left, top: top[index % cols], width }}>
          <ImageLoader src={file.thumbnails[0] || file.location} onVisible={true}>
            <Image key={file.id} src={file.thumbnails[0] || file.location} alt="" width="100%" fluid />
          </ImageLoader>
        </div>
      );

      { top[index % cols] += ((file.metadata.height * (width / file.metadata.width))) + 20 }

      return element;
    });

    const newGalleryHeight = Math.max(...top);
    if (galleryHeight !== newGalleryHeight) setGalleryHeight(Math.max(...top));

    return elements;
  }

  return (
    <div id="zdielaj-si-gallery" ref={galleryRef}>
      <LightGallery
        plugins={[lgVideo]}
        download={true}
        mobileSettings={{download: true}}
        selector=".gallery-item"
      >
        <div style={{ position: 'relative', height: galleryHeight }}>
          <div style={{ position: 'relative', height: '100%', width: galleryWidth, margin: '0 auto' }}>
          {
            renderPictures(files, innerWidth, cols)
          }
          </div>
        </div>
      </LightGallery>
    </div>
  );
}
