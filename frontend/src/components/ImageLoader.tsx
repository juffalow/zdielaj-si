import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface ImageLoaderProps {
  src: string;
  alt?: string;
  alternativeImage?: string;
  [x:string]: any;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt, alternativeImage, ...rest }: ImageLoaderProps) => {
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
    return <Spinner animation="border" />;
  }

  return (
    <img src={src} alt={alt} {...rest} />
  );
}

export default ImageLoader;
