import { useState } from 'react';
import { CouponForm } from '../../components/coupon-form/coupon-form';

/* eslint-disable-next-line */
export interface CouponProps {}

export function Coupon(props: CouponProps) {
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  return (
    <div className="w-[480px] bg-gray-300 p-8">
      <h1>Welcome to Coupon!</h1>
      <div className="p-3 border border-dashed">
        <h2>This is the Coupon Form component</h2>
        <CouponForm
          planId={'plan_GqM9N6qyhvxaVk'}
          readOnly={false}
          appliedPromotionCode={appliedCoupon}
          setAppliedPromotionCode={setAppliedCoupon}
        />
      </div>
      {appliedCoupon && (
        <div className="p-3 border border-dashed">
          <h2>This is on the Coupon Page</h2>
          <div className="bg-green-400 p-2 rounded-lg">Success</div>
        </div>
      )}
    </div>
  );
}

export default Coupon;
