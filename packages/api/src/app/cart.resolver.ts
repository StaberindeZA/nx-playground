import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { checkPromotionCode } from '@nx-play/api-client';

export interface CartEntity {
  id: number;
  promotionCode: string;
}

@Resolver('Cart')
export class CartResolver {
  private carts: CartEntity[] = [
    {
      id: 1,
      promotionCode: 'CODE',
    },
    {
      id: 2,
      promotionCode: '',
    },
  ];

  @Query('allCarts')
  getAllCarts(): CartEntity[] {
    return this.carts;
  }

  @Query('singleCart')
  getSingleCart(@Args('id') id: number): CartEntity {
    const cart = this.carts.find((cart) => cart.id === id);

    if (!cart) throw new Error(`Could not find cart with id: ${id}`);

    return cart;
  }

  @Mutation()
  addCart(@Args('promotionCode') promotionCode: string) {
    const newCart = {
      id: this.carts.length + 1,
      promotionCode,
    };

    this.carts.push(newCart);

    return newCart;
  }

  @Mutation()
  updateCart(
    @Args('id') id: number,
    @Args('promotionCode') promotionCode: string
  ) {
    let returnCart = null;
    this.carts.forEach((cart) => {
      if (cart.id === id) {
        cart.promotionCode = promotionCode;
        returnCart = cart;
      }
    });

    return returnCart;
  }

  @Mutation('checkPromotionCode')
  async checkPromotionCode(
    @Args('id') id: number,
    @Args('promotionCode') promotionCode: string
  ) {
    try {
      await checkPromotionCode('plan_GqM9N6qyhvxaVk', promotionCode);
    } catch (err) {
      console.error(err);
      throw err;
    }

    let returnCart = null;
    this.carts.forEach((cart) => {
      if (cart.id === id) {
        cart.promotionCode = promotionCode;
        returnCart = cart;
      }
    });

    return returnCart;
  }
}
