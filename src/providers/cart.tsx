'use client'

import { ProductsWithTotalPrice } from '@/helpers/product';
import { Product } from '@prisma/client'
import { ReactNode, createContext, useState } from 'react';

export interface CartProduct extends ProductsWithTotalPrice {
 quantity: number;
}

interface ICartContext {
 products: CartProduct[]
 cartBasePrice: number;
 cartTotalPrice: number;
 cartDiscountPrice: number;
 addProductsToCart: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
 products: [],
 cartBasePrice: 0,
 cartDiscountPrice: 0,
 cartTotalPrice: 0,
 addProductsToCart: () => { }
})

const CartProvider = ({ children }: { children: ReactNode }) => {

 const [products, setProducts] = useState<CartProduct[]>([]);

 const addProductsToCart = (product: CartProduct) => {

  const productIsAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)

  if (productIsAlreadyOnCart) {
   setProducts((prev) => 
   prev.map(cartProduct => {
    if (cartProduct.id === product.id) {
     return {
      ...cartProduct,
      quantity: cartProduct.quantity + product.quantity,
     };
    }

    return cartProduct
   }))

   return;
  }

  setProducts((prev) => [...prev, product]);
 }

 return (
  <CartContext.Provider
   value={{
    products,
    addProductsToCart,
    cartBasePrice: 0,
    cartDiscountPrice: 0,
    cartTotalPrice: 0,
   }}>
   {children}
  </CartContext.Provider>
 );
}

export default CartProvider;