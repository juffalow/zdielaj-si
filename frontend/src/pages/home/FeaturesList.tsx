import React from 'react';
import './FeaturesList.css';

interface Props {
  children: React.ReactNode;
}

const FeaturesList: React.FC<Props> = ({ children }) => (
  <ul className="features-list">
    {children}
  </ul>
);

export default FeaturesList;
