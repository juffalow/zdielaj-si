import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => (
  <>
    <h1>Ďakujem za registráciu!</h1>
    <p>Môžeš pokračovať prihlásením sa <Link to="/prihlasit-sa">tu</Link>.</p>
  </>
);

export default ThankYou;
