import React from 'react';
import Col from 'react-bootstrap/Col';
import './Thumbnails.css';

const Thumbnails = ({ files }: any) => {
  return files.map((file: any) => (
    <Col lg={files.length >= 6 ? 2 : true} md={files.length >= 6 ? 2 : true} sm={files.length >= 3 ? 3 : true} xs={files.length === 1 ? true : 6}>
      <div className="thumbnail-container">
        <img src={file.preview} className="thumbnail-image" alt="" />
      </div>
    </Col>
  ));
}

export default Thumbnails;
