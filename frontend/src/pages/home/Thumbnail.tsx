import React from 'react';
import './Thumbnail.css';

const Thumbnail: React.FC<any> = ({ file }: any) => (
  <div className="thumbnail-container">
    <img src={file.preview} className="thumbnail-image" alt="" />
  </div>
)

export default Thumbnail;
