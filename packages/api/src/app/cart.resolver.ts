import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

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
}
