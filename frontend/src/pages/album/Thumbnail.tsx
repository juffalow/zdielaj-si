import React from 'react';
import './Thumbnail.css';

const Thumbnail = ({ photo }: any) => (
  <div className="thumbnail-container">
    <img src={photo.location} className="thumbnail-image" alt="" />
  </div>
);

export default Thumbnail;
