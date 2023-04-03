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
            className="flex-1 font-semibold rounded-md text-base py-2 px-5 w-full inline-block text-center border font-header box-border transition-standard"
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
          className="bg-white border border-gray-900/30 rounded-md h-10 w-full p-4 disabled:bg-gray-300 disabled:text-gray-500"
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
          className="flex-1 font-semibold rounded-md text-base py-2 px-5 w-full inline-block text-center border font-header box-border transition-standard bg-blue-500 border-blue-600 text-white disabled:bg-gray-300"
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
}

export function CouponForm({
  planId,
  readOnly,
  appliedPromotionCode,
  setAppliedPromotionCode,
}: CouponFormProps) {
  const [promotionCode, setPromotionCode] = useState<string>(
    appliedPromotionCode || ''
  );
  const [error, setError] = useState<string>('');
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
