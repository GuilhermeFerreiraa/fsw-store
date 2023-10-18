import { Product } from '@prisma/client'

interface ProductsWithTotalPrice {
 totalPrice: Number,
}

export const computeProductTotalPrice = (product: Product): ProductsWithTotalPrice => {
 if (product.discountPercentage === 0) {
  return {
   ...product,
   totalPrice: Number(product.basePrice),
  }
 }

 const totalPrice = Number(product.basePrice) * (product.discountPercentage / 100);

 return {
  ...product,
  totalPrice,
 }
}