import React from 'react';
import './FeaturesList.css';

const FeaturesList: React.FC = ({ children }) => (
  <ul className="features-list">
    {children}
  </ul>
);

export default FeaturesList;
