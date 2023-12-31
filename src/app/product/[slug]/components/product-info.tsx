'use client'

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductsWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProductInfoProps {
 product: ProductsWithTotalPrice;
}


const ProductInfo = ({ product }: ProductInfoProps) => {

 const { addProductsToCart } = useContext(CartContext);

 const [quantity, setQuantity] = useState(1);

 const handleDecreaseQuantityClick = () => {
  setQuantity(prev => prev === 1 ? prev : prev - 1)
 }

 const handleIncreaseQuantityClick = () => {
  setQuantity(prev => prev + 1)
 }

 const handleAddProductToCart = () => {
  addProductsToCart({ ...product, quantity })
 }

 return (
  <div className="flex flex-col p-5">
   <h2 className="text-lg">{product.name}</h2>

   <div className="flex items-center gap-2">
    <h1 className="text-xl font-bold">R$ {product.totalPrice.toFixed(2).replace('.', ',')}</h1>
    {product.discountPercentage > 0 && (
     <DiscountBadge>
      {product.discountPercentage}
     </DiscountBadge>
    )}

   </div>
   {product.discountPercentage > 0 && (
    <p className="text-sm line-through opacity-75">
     R$ {Number(product.basePrice).toFixed(2).replace('.', ',')}
    </p>
   )}

   <div className="flex items-center gap-2 mt-4">
    <Button onClick={handleDecreaseQuantityClick} size="icon" variant="outline">
     <ArrowLeftIcon size={16} />
    </Button>

    <span>
     {quantity}
    </span>

    <Button onClick={handleIncreaseQuantityClick} size="icon" variant="outline">
     <ArrowRightIcon size={16} />
    </Button>
   </div>

   <div className="flex flex-col gap-3 mt-8">
    <h3 className="font-bold text-base">
     Descrição
    </h3>
    <p className="opacity-60 text-justify text-sm">
     {product.description}
    </p>
   </div>

   <Button className="mt-8 uppercase font-bold" onClick={() => handleAddProductToCart()}>
    Adicionar ao Carrinho
   </Button>

   <div className="bg-accent rounded-lg px-5 py-2 mt-5 flex justify-between items-center">
    <div className="flex items-center gap-3">

     <TruckIcon />

     <div className="flex flex-col">
      <p className="text-xs">
       Entrega via <span className="font-bold">FSPacket®</span>
      </p>
      <p className="text-[#8162FF] text-xs">
       Envio para <span className="font-semibold">
        todo Brasil
       </span>
      </p>
     </div>
    </div>

    <p className="text-xs font-bold">
     Frete Grátis
    </p>
   </div>
  </div>
 );
}



export default ProductInfo;