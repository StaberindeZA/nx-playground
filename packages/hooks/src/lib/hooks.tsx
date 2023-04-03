import { useEffect, useState } from 'react';
import { CouponDetails } from '../types';

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

  return true;
};

/**
 * Custom Hook to fetch invoice preview for priceId
 * @param priceId
 * @param customerSubscriptions
 * @returns
 */
export function useFetchCouponDetails(priceId: string, promotionCode?: string) {
  const [couponDetails, setCouponDetails] = useState<{
    loading: boolean;
    error: string;
    result?: CouponDetails;
  }>({ loading: false, error: '', result: undefined });

  useEffect(() => {
    const getCouponDetails = async () => {
      try {
        setCouponDetails({
          loading: true,
          error: '',
          result: undefined,
        });

        const couponDetailsResult = await fetch(
          `/v1/oauth/subscriptions/coupon`,
          {
            method: 'POST',
            body: JSON.stringify({ priceId, promotionCode }),
          }
        );

        const couponDetails =
          (await couponDetailsResult.json()) as CouponDetails;

        if (couponDetails?.expired) {
          throw new Error('Expired');
        }

        if (couponDetails?.maximallyRedeemed) {
          throw new Error('Limit Reached');
        }

        if (!couponDetails.valid || !couponDetails?.discountAmount) {
          throw new Error('Invalid');
        }

        setCouponDetails({
          loading: false,
          error: '',
          result: couponDetails,
        });
      } catch (err: any) {
        setCouponDetails({
          loading: false,
          error: err.message || '',
          result: undefined,
        });
      }
    };

    getCouponDetails();
  }, [priceId, promotionCode]);

  return couponDetails;
}
