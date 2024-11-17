import { useState, useEffect, useRef } from 'react';
import styles from './ImageLoader.module.css';

interface ImageLoaderProps {
  children?: JSX.Element | null;
  src: string;
  alt?: string;
  alternativeImage?: string;
  onVisible?: boolean;
  [x:string]: unknown;
}

const ImageLoader = ({ children, src, alt, alternativeImage, onVisible, ...rest }: ImageLoaderProps) => {
  const observerTarget = useRef(null);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (typeof onVisible === 'boolean' || onVisible === true) {
      return;
    }

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

  useEffect(() => {
    if (typeof onVisible === 'undefined' || onVisible === false) {
      return;
    }
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
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
        }
      },
      { threshold: 0.2 }
    );
  
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
  
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  if (isLoading) {
    return <div className={styles.loader} ref={observerTarget} {...rest} />;
  }

  if (children) {
    return (<>{ children }</>);
  }

  return (
    <img src={src} alt={alt} {...rest} />
  );
}

export default ImageLoader;
