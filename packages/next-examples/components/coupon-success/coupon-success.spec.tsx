import { render } from '@testing-library/react';

import CouponSuccess from './coupon-success';

describe('CouponSuccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CouponSuccess />);
    expect(baseElement).toBeTruthy();
  });
});
