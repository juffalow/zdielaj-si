import layout from './layout';

interface Parameters {
  email: string;
  firstName: string;
  city?: string;
  country?: string;
  os?: string;
  browser?: string;
  version?: string;
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
    <br />
    <br />
    <p>Informácie o prihlásení:</p>
    <ul>
      <li>Lokalita: ${parameters.city}, ${parameters.country}</li>
      <li>Operačný systém: ${parameters.os}</li>
      <li>Prehliadač: ${parameters.browser}</li>
      <li>Verzia: ${parameters.version}</li>
    </ul>
  `;

  return layout({ ...parameters, content });
}

export default {
  render,
}
