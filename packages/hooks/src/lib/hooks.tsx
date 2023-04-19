import { useEffect, useState } from 'react';
import { CouponDetails } from '../types';

let usedPromotionCode: string;

export const checkPromotionCode = async (
  priceId: string,
  promotionCode?: string
) => {
  const couponDetailsResult = await fetch(
    `http://localhost:9000/v1/oauth/subscriptions/coupon`,
    {
      mode: 'cors',
      credentials: 'omit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, promotionCode }),
    }
  );

  const couponDetails = (await couponDetailsResult.json()) as CouponDetails;

  if (couponDetails?.expired) {
    throw new Error('Expired');
  }

  if (couponDetails?.maximallyRedeemed) {
    throw new Error('Limit Reached');
  }

  if (!couponDetails.valid || !couponDetails?.discountAmount) {
    throw new Error('Invalid');
  }

  usedPromotionCode = promotionCode || '';

  console.log(usedPromotionCode);

  return true;
};

export async function getCart() {
  console.log(usedPromotionCode);
  return {
    promotionCode: usedPromotionCode || '',
  };
}
