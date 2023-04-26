import { useQuery } from '@apollo/client';
import { CART_QUERY } from '../coupon-form/coupon-form';

const CART_ID = 1;

/* eslint-disable-next-line */
export interface CouponSuccessProps {}

export function CouponSuccess(props: CouponSuccessProps) {
  const {
    data: {
      singleCart: { promotionCode },
    },
  } = useQuery(CART_QUERY, {
    variables: {
      id: CART_ID,
    },
  });

  if (!promotionCode) return null;

  return (
    <div className="mt-3 p-3 border border-dashed">
      <div className="bg-green-400 p-2 rounded-lg">
        Success from CouponSuccess
      </div>
    </div>
  );
}

export default CouponSuccess;
