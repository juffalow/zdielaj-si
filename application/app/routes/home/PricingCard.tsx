import { Button } from '@heroui/react';

export default function PricingCard({ title, price, period, features, backgroundClass }: { title: string, price: string, period: string, features: string[], backgroundClass?: string }) {
  return (
    <div className={`rounded-3xl ${backgroundClass} p-8 ring-1 ring-white/10 sm:mx-8 sm:p-10 lg:mx-0`}>
      <h3 className="text-2xl font-semibold text-indigo-400">
        {title}
      </h3>
      <p className="mt-4 flex items-baseline gap-x-2">
        <span className="text-5xl font-semibold tracking-tight text-black">{price}</span>
        <span className="text-base text-gray-400">/{period}</span>
      </p>
      <p className="mt-6 text-base/7">The perfect plan if you're just getting started with our product.</p>
      <Button variant="primary" size="lg" className="mt-4">Sign up</Button>
      <ul role="list" className="mt-8 space-y-3 text-sm/6 sm:mt-10">
        {features.map((feature) => (
          <li className="flex gap-x-3">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              data-slot="icon"
              aria-hidden="true"
              className="h-6 w-5 flex-none text-indigo-400"
            >
              <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd"></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
