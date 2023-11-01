"use server"

import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";

export const createOrder = async (cartProduct: CartProduct[], userId: string) => {

 const order = await prismaClient.order.create({
  data: {
   userID: userId,
   status: "PAYMENT_PENDING",
   orderProducts: {
    createMany: {
     data: cartProduct.map((product) => ({
      basePrice: product.basePrice,
      discountPercentage: product.discountPercentage,
      productId: product.id,
      quantity: product.quantity,
     })),
    }
   }
  }
 })

 return order;
}