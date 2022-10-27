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
    <p><strong>Ak si to bol(a) ty</strong>, tak tento e-mail môžeš ignorovať.</p>
    <p><strong>Ak si to nebol(a) ty</strong>, odporúčam zmeniť heslo.</p>
  `;

  return layout({ ...parameters, content });
}

export default {
  render,
}
