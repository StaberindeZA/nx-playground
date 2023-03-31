import styles from './index.module.css';

/* eslint-disable-next-line */
export interface CouponProps {}

export function Coupon(props: CouponProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Coupon!</h1>
    </div>
  );
}

export default Coupon;
