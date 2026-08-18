import { Link as RouterLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../constants';

export default function PricingCard({
  tier,
  title,
  price,
  period,
  features,
  backgroundClass,
}: {
  tier: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  backgroundClass?: string;
}) {
  const { i18n, t } = useTranslation('', { keyPrefix: `home.pricing.${tier}` });

  return (
    <div className={`rounded-3xl ${backgroundClass} p-8 ring-1 ring-white/10 sm:mx-8 sm:p-10 lg:mx-0`}>
      <h3 className="text-2xl font-semibold text-indigo-400">{title}</h3>
      <p className="mt-4 flex items-baseline gap-x-2">
        <span className="text-5xl font-semibold tracking-tight text-black">{price}</span>
        <span className="text-base text-gray-400">/{period}</span>
      </p>
      {/* <p className="mt-6 text-base/7">The perfect plan if you're just getting started with our product.</p> */}
      <RouterLink
        to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signUp}`}
        className="button bg-blue-500 hover:bg-blue-400 text-white text-lg hidden sm:flex my-5"
        data-tracking-id={`pricing_${tier}_sign_up_click`}
      >
        {t('signUp')}
      </RouterLink>
      <ul role="list" className="space-y-3 text-sm/6">
        {features.map((feature, index) => (
          <li className="flex gap-x-3" key={index}>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              data-slot="icon"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-indigo-400"
            >
              <path
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
