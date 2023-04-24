export interface CouponDetails {
  promotionCode: string;
  type: string;
  durationInMonths: number | null;
  valid: boolean;
  discountAmount?: number;
  expired: boolean;
  maximallyRedeemed: boolean;
}
