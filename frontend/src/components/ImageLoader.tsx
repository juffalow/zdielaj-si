import { useState, useEffect } from 'react';
import styles from './ImageLoader.module.css';

interface ImageLoaderProps {
  children: JSX.Element | null;
  src: string;
  alt?: string;
  alternativeImage?: string;
  [x:string]: unknown;
}

const ImageLoader = ({ children, src, alt, alternativeImage, ...rest }: ImageLoaderProps) => {
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      setIsLoading(false);
    };

    image.onerror = () => {
      if (typeof alternativeImage !== 'undefined') {
        image.src = alternativeImage;
      }
    };

    image.src = src;
  }, []);

  if (isLoading) {
    return <div className={styles.loader} {...rest} />;
  }

  if (children) {
    return (<>{ children }</>);
  }

  return (
    <img src={src} alt={alt} {...rest} />
  );
}

export default ImageLoader;
