import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => (
  <>
    <h1>Ďakujem za registráciu!</h1>
    <p>Bol ti odoslaný e-mail s odkazom na overenie tvojej e-mailovej adresy.</p>
    <p>Po úspešnom overení môžeš pokračovať prihlásením sa <Link to="/prihlasit-sa">tu</Link>.</p>
  </>
);

export default ThankYou;
