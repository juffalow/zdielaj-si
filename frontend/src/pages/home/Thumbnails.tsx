import React from 'react';
import Col from 'react-bootstrap/Col';
import './Thumbnails.css';

const Thumbnails = ({ files }: any) => {
  return files.map((file: any) => (
    <Col>
      <div className="thumbnail-container">
        <img src={file.preview} className="thumbnail-image" alt="" />
      </div>
    </Col>
  ));
}

export default Thumbnails;
