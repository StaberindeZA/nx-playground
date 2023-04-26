import { gql } from '@apollo/client';
import CouponForm, {
  CART_QUERY,
} from '../../../components/coupon-form/coupon-form';
import { addApolloState, initializeApollo } from '../../../lib/apolloClient';
import { CartEntity, CMSEntity } from '@nx-play/api-client';
import CouponSuccess from '../../../components/coupon-success/coupon-success';

export const CMS_QUERY = gql`
  query singleCMS($offering: String!) {
    singleCMS(offering: $offering) {
      offering
      details
    }
  }
`;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  const {
    data: { singleCart },
  } = await apolloClient.query({
    query: CART_QUERY,
    variables: {
      id: 1,
    },
  });

  const {
    data: { singleCMS },
  } = await apolloClient.query({
    query: CMS_QUERY,
    variables: {
      offering: 'vpn',
    },
  });

  return addApolloState(apolloClient, {
    props: {
      temp: 'tempData',
      cms: singleCMS || null,
      cart: singleCart || null,
    },
  });
}

/* eslint-disable-next-line */
export interface CheckoutProps {
  cms: CMSEntity;
  cart: CartEntity;
}

export function Checkout({ cms, cart }: CheckoutProps) {
  const { details } = cms;

  return (
    <div className="w-[480px] bg-gray-300 p-8">
      <h1>Welcome to Checkout!</h1>
      <div className="mt-3 p-3 border border-dashed">
        <ul>
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
      <CouponForm readOnly={false} />
      <CouponSuccess />
      {!!cart.promotionCode && (
        <div className="mt-3 p-3 border border-dashed">
          <div className="bg-green-400 p-2 rounded-lg">Success from Page</div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
