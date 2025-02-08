import type { FunctionComponent, ReactNode } from 'react';
import './FeaturesList.css';

interface Props {
  children: ReactNode;
}

const FeaturesList: FunctionComponent<Props> = ({ children }) => (
  <ul className="features-list">
    {children}
  </ul>
);

export default FeaturesList;
