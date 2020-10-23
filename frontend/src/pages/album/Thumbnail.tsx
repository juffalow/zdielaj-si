import React from 'react';
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
      <img src={photo.location} className="thumbnail-image" alt="" onClick={onClick} />
    </div>
  );
};

export default Thumbnail;
