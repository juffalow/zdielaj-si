import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import type { Route } from './+types/subscription';
import PricingTable from './subscription/PricingTable';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  switch (language) {
    case 'sk':
      return [{ title: 'Predplatné | Zdielaj.si' }];
    case 'cz':
      return [{ title: 'Předplatné | Zdielaj.si' }];
    case 'de':
      return [{ title: 'Abonnement | Zdielaj.si' }];
    case 'es':
      return [{ title: 'Suscripción | Zdielaj.si' }];
    case 'fr':
      return [{ title: 'Abonnement | Zdielaj.si' }];
    case 'it':
      return [{ title: 'Abbonamento | Zdielaj.si' }];
    case 'pl':
      return [{ title: 'Subskrypcja | Zdielaj.si' }];
    case 'nl':
      return [{ title: 'Abonnement | Zdielaj.si' }];
    case 'si':
      return [{ title: 'Prenumerata | Zdielaj.si' }];
    case 'fi':
      return [{ title: 'Tilaus | Zdielaj.si' }];
    case 'se':
      return [{ title: 'Prenumeration | Zdielaj.si' }];
    case 'no':
      return [{ title: 'Abonnement | Zdielaj.si' }];
    case 'dk':
      return [{ title: 'Abonnement | Zdielaj.si' }];
    case 'hu':
      return [{ title: 'Előfizetés | Zdielaj.si' }];
    case 'en':
    default:
      return [{ title: 'Subscription | Zdielaj.si' }];
  }
}

const Subscription: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'subscription' });

  return (
    <div>
      <h1 className="text-center text-5xl font-bold mb-10">{t('title')}</h1>
      <PricingTable />
    </div>
  );
};

export default Subscription;
