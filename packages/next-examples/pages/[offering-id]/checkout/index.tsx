import CouponForm, {
  CART_QUERY,
} from '../../../components/coupon-form/coupon-form';
import { addApolloState, initializeApollo } from '../../../lib/apolloClient';
import { useState } from 'react';

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const value = await apolloClient.query({
    query: CART_QUERY,
    variables: {
      id: 1,
    },
  });

  console.log({ value });

  return addApolloState(apolloClient, {
    props: {},
  });
}

/* eslint-disable-next-line */
export interface CheckoutProps {}

export function Checkout(props: CheckoutProps) {
  const [appliedCouponCheckout, setAppliedCouponCheckout] =
    useState<string>('');

  return (
    <div className="w-[480px] bg-gray-300 p-8">
      <h1>Welcome to Checkout!</h1>
      <CouponForm
        readOnly={false}
        appliedPromotionCode={appliedCouponCheckout}
        setAppliedPromotionCode={setAppliedCouponCheckout}
      />
      {appliedCouponCheckout && (
        <div className="mt-3 p-3 border border-dashed">
          <div className="bg-green-400 p-2 rounded-lg">Success</div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
