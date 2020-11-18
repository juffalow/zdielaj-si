import React from 'react';
import './Thumbnail.css';

const AddPhotoCard: React.FC = () => (
  <div className="thumbnail-container" style={{ cursor: 'pointer' }}>
    <span className="thumbnail-image" style={{ fontSize: '4em', fontWeight: 100 }}>+</span>
  </div>
)

export default AddPhotoCard;
