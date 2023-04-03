import { FormEventHandler, useState } from 'react';
import { checkPromotionCode } from '@nx-play/hooks';

interface WithCouponProps {
  readOnly: boolean;
  disabled: boolean;
  promotionCode: string;
  clearPromotionCode: () => void;
}

function WithCoupon({
  promotionCode,
  readOnly,
  disabled,
  clearPromotionCode,
}: WithCouponProps) {
  return (
    <div
      className="flex gap-4 justify-between items-center"
      data-testid="coupon-hascoupon"
    >
      <div className="break-all">{promotionCode}</div>
      {readOnly ? null : (
        <div>
          <button
            className="secondary-button"
            onClick={clearPromotionCode}
            disabled={disabled}
            data-testid="coupon-remove-button"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

interface WithoutCouponProps {
  disabled: boolean;
  promotionCode: string;
  setPromotionCode: (promotionCode: string) => void;
  onSubmit: (event) => void;
}

function WithoutCoupon({
  disabled,
  promotionCode,
  setPromotionCode,
  onSubmit,
}: WithoutCouponProps) {
  return (
    <form
      className="flex gap-4 justify-between items-center"
      onSubmit={onSubmit}
      data-testid="coupon-form"
    >
      <div className="input-row">
        <input
          className="coupon-input"
          type="text"
          name="coupon"
          data-testid="coupon-input"
          value={promotionCode}
          onChange={(event) => {
            setPromotionCode(event.target.value);
          }}
          placeholder="Enter code"
          disabled={disabled}
        />
      </div>

      <div>
        <button
          name="apply"
          className="primary-button"
          type="submit"
          data-testid="coupon-button"
          disabled={disabled}
        >
          Apply
        </button>
      </div>
    </form>
  );
}

/* eslint-disable-next-line */
export interface CouponFormProps {
  planId: string;
  readOnly: boolean;
  appliedPromotionCode: string;
  setAppliedPromotionCode: (coupon: string) => void;
  initialPromotionCode?: string;
  initialErrorMessage?: string;
}

export function CouponForm({
  planId,
  readOnly,
  appliedPromotionCode,
  setAppliedPromotionCode,
  initialPromotionCode,
  initialErrorMessage,
}: CouponFormProps) {
  const [promotionCode, setPromotionCode] = useState<string>(
    initialPromotionCode || appliedPromotionCode || ''
  );
  const [error, setError] = useState<string>(initialErrorMessage || '');
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      setDisabled(true);
      await checkPromotionCode(planId, promotionCode);
      setAppliedPromotionCode(promotionCode);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setDisabled(false);
    }
  };

  const hasPromotionCode = !!appliedPromotionCode;

  return (
    <div
      className="bg-white rounded-b-lg shadow-sm shadow-grey-300 mt-6 p-4 rounded-t-lg text-base tablet:my-8 coupon-component"
      data-testid="coupon-component"
    >
      <h4 className="m-0 mb-4 font-bold">
        {hasPromotionCode ? `Promo Code Applied` : `Promo Code`}
      </h4>
      {hasPromotionCode ? (
        <WithCoupon
          readOnly={readOnly}
          disabled={disabled}
          promotionCode={promotionCode}
          clearPromotionCode={() => {
            setPromotionCode('');
            setAppliedPromotionCode('');
          }}
        />
      ) : (
        <WithoutCoupon
          disabled={disabled}
          promotionCode={promotionCode}
          setPromotionCode={setPromotionCode}
          onSubmit={onSubmit}
        />
      )}
      {error && (
        <div className="text-red-700 mt-4" data-testid="coupon-error">
          {error}
        </div>
      )}
    </div>
  );
}

export default CouponForm;
