import layout from './layout';

interface Parameters {
  email: string;
  firstName: string;
  title: string;
  unsubscribeUrl: string;
}

const render = (parameters: Parameters): string => {
  const content = `
    <p><strong>Ahoj ${parameters.firstName},</strong></p>
    <p>práve prebehlo prihlásenie do tvojho účtu na <a href="https://zdielaj.si">Zdielaj.si</a>.</p>
    <ul>
      <li>Ak si to bol(a) ty, tak tento e-mail môžeš ignorovať</li>
      <li>Ak si to nebol(a) ty, odporúčam zmeniť heslo</li>
    </ul>
  `;

  return layout({ ...parameters, content });
}

export default {
  render,
}
