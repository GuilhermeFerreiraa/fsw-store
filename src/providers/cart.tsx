'use client'

import { Product } from '@prisma/client'
import { ReactNode, createContext } from 'react';

interface CartProduct extends Product {
 quantity: number;
}

interface ICartContext {
 products: CartProduct[]
 cartBasePrice: number;
 cartTotalPrice: number;
 cartDiscountPrice: number;
}

const CartContext = createContext<ICartContext>({
 products: [],
 cartBasePrice: 0,
 cartDiscountPrice: 0,
 cartTotalPrice: 0,
})

const CartProvider = ({ children }: { children: ReactNode }) => {
 return (
  <CartContext.Provider
   value={{
    products: [],
    cartBasePrice: 0,
    cartDiscountPrice: 0,
    cartTotalPrice: 0,
   }}>
   {children}
  </CartContext.Provider>
 );
}

export default CartProvider;