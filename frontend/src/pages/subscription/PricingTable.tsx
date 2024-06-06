import { useEffect } from 'react';
import useAuth from '../../utils/useAuth';

const PricingTable = () => {
  const { user } = useAuth();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <stripe-pricing-table
      pricing-table-id={process.env.REACT_APP_STRIPE_TABLE_ID}
      publishable-key={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      client-reference-id={user?.id}
    ></stripe-pricing-table>
  );
};



export default PricingTable;
