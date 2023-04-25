export interface CouponDetails {
  promotionCode: string;
  type: string;
  durationInMonths: number | null;
  valid: boolean;
  discountAmount?: number;
  expired: boolean;
  maximallyRedeemed: boolean;
}
export interface CartEntity {
  id: number;
  promotionCode: string;
}
export interface CMSEntity {
  offering: string;
  details: string[];
}
