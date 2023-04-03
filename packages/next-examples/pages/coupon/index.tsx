import { useState } from 'react';
import { CouponForm } from '../../components/coupon-form/coupon-form';

/* eslint-disable-next-line */
export interface CouponProps {}

export function Coupon(props: CouponProps) {
  const [appliedCouponCheckout, setAppliedCouponCheckout] =
    useState<string>('');
  const [appliedCouponCheckoutApplied, setAppliedCouponCheckoutApplied] =
    useState<string>('EVERYTHING');
  const [appliedCouponSuccess, setAppliedCouponSuccess] =
    useState<string>('EVERYTHING');
  return (
    <div className="w-[480px] bg-gray-300 p-8">
      <h1>Welcome to Coupon!</h1>

      <div className="my-4 p-3 border">
        <h2>As used on Checkout</h2>
        <div className="p-3 border border-dashed">
          <h3>This is the Coupon Form component</h3>
          <CouponForm
            planId={'plan_GqM9N6qyhvxaVk'}
            readOnly={false}
            appliedPromotionCode={appliedCouponCheckout}
            setAppliedPromotionCode={setAppliedCouponCheckout}
          />
        </div>
        {appliedCouponCheckout && (
          <div className="p-3 border border-dashed">
            <h3>This is on the Page</h3>
            <div className="bg-green-400 p-2 rounded-lg">Success</div>
          </div>
        )}
      </div>

      <div className="my-4 p-3 border">
        <h2>As used on Checkout with query param</h2>
        <div className="p-3 border border-dashed">
          <h3>This is the Coupon Form component</h3>
          <CouponForm
            planId={'plan_GqM9N6qyhvxaVk'}
            readOnly={false}
            appliedPromotionCode={appliedCouponCheckoutApplied}
            setAppliedPromotionCode={setAppliedCouponCheckoutApplied}
          />
        </div>
        {appliedCouponCheckoutApplied && (
          <div className="p-3 border border-dashed">
            <h3>This is on the Page</h3>
            <div className="bg-green-400 p-2 rounded-lg">Success</div>
          </div>
        )}
      </div>

      <div className="my-4 p-3 border">
        <h2>As used on Checkout with invalid query param</h2>
        <div className="p-3 border border-dashed">
          <h3>This is the Coupon Form component</h3>
          <CouponForm
            planId={'plan_GqM9N6qyhvxaVk'}
            readOnly={false}
            appliedPromotionCode={appliedCouponCheckout}
            setAppliedPromotionCode={setAppliedCouponCheckout}
            initialPromotionCode="INVALID"
            initialErrorMessage="Invalid"
          />
        </div>
        {appliedCouponCheckout && (
          <div className="p-3 border border-dashed">
            <h3>This is on the Page</h3>
            <div className="bg-green-400 p-2 rounded-lg">Success</div>
          </div>
        )}
      </div>

      <div className="my-4 p-3 border">
        <h2>As used on Success</h2>
        <div className="p-3 border border-dashed">
          <h3>This is the Coupon Form component</h3>
          <CouponForm
            planId={'plan_GqM9N6qyhvxaVk'}
            readOnly={true}
            appliedPromotionCode={appliedCouponSuccess}
            setAppliedPromotionCode={setAppliedCouponSuccess}
          />
        </div>
        {appliedCouponSuccess && (
          <div className="p-3 border border-dashed">
            <h3>This is on the Page</h3>
            <div className="bg-green-400 p-2 rounded-lg">Success</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Coupon;
