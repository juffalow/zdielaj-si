import React from 'react';
import './FeaturesList.css';

const FeaturesList = ({ children }: any) => (
  <ul className="features-list">
    {children}
  </ul>
);

export default FeaturesList;
