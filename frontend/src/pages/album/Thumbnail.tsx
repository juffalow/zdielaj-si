import React from 'react';
import ImageLoader from '../../components/ImageLoader';
import './Thumbnail.css';

const Thumbnail = ({ photo }: any) => {
  const onClick = () => {
    const element = document.createElement('a');
    element.href = photo.location;
    element.download = photo.location.substr(photo.location.lastIndexOf('/') + 1);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="thumbnail-container">
      <ImageLoader
        src={photo.thumbnail !== null ? photo.thumbnail.location : photo.location}
        alt=""
        className="thumbnail-image"
        onClick={onClick}
      />
    </div>
  );
};

export default Thumbnail;
