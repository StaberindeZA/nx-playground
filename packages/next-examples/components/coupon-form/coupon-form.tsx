import styles from './coupon-form.module.css';

/* eslint-disable-next-line */
export interface CouponFormProps {}

export function CouponForm(props: CouponFormProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CouponForm!</h1>
    </div>
  );
}

export default CouponForm;
