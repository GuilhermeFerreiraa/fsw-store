'use client'

import { ProductsWithTotalPrice } from '@/helpers/product';
import { ReactNode, createContext, useMemo, useState } from 'react';

export interface CartProduct extends ProductsWithTotalPrice {
 quantity: number;
}

interface ICartContext {
 products: CartProduct[]
 cartBasePrice: number;
 subTotal: number;
 total: number;
 totalDiscount: number;
 cartTotalPrice: number;
 cartDiscountPrice: number;
 addProductsToCart: (product: CartProduct) => void;
 decreaseProductQuantity: (productId: string) => void;
 increaseProductQuantity: (productId: string) => void;
 removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
 products: [],
 cartBasePrice: 0,
 cartDiscountPrice: 0,
 cartTotalPrice: 0,
 subTotal: 0,
 total: 0,
 totalDiscount: 0,
 addProductsToCart: () => { },
 decreaseProductQuantity: () => { },
 increaseProductQuantity: () => { },
 removeProductFromCart: () => { },
})

const CartProvider = ({ children }: { children: ReactNode }) => {

 const [products, setProducts] = useState<CartProduct[]>([]);

 const subTotal = useMemo(() => {
  return products.reduce((acc, products) => {
   return acc + (Number(products.basePrice) * products.quantity)
  }, 0);
 }, [products]);

 const total = useMemo(() => {
  return products.reduce((acc, products) => {
   return acc + (Number(products.totalPrice) * products.quantity)
  }, 0);
 }, [products]);


 const totalDiscount = subTotal - total;

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

 const increaseProductQuantity = (productId: string) => {
  setProducts(prev => prev.map(cartProduct => {
   if (cartProduct.id === productId) {
    return {
     ...cartProduct,
     quantity: cartProduct.quantity + 1,
    };
   }

   return cartProduct;
  }),
  );
 }

 const decreaseProductQuantity = (productId: string) => {
  setProducts(prev => prev.map(cartProduct => {
   if (cartProduct.id === productId) {
    return {
     ...cartProduct,
     quantity: cartProduct.quantity - 1,
    };
   }

   return cartProduct;
  }).filter(cartProduct => cartProduct.quantity > 0),
  );
 }

 const removeProductFromCart = (productId: string) => {
  setProducts(prev => prev.filter(cartProduct => cartProduct.id !== productId))
 }

 return (
  <CartContext.Provider
   value={{
    products,
    subTotal,
    total,
    totalDiscount,
    addProductsToCart,
    removeProductFromCart,
    decreaseProductQuantity,
    increaseProductQuantity,
    cartBasePrice: 0,
    cartDiscountPrice: 0,
    cartTotalPrice: 0,
   }}>
   {children}
  </CartContext.Provider>
 );
}

export default CartProvider;