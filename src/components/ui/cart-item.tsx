import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
 product: CartProduct
}


const CartItem = ({ product }: CartItemProps) => {

 const { increaseProductQuantity, decreaseProductQuantity, removeProductFromCart } = useContext(CartContext);

 const handleDecreaseProductQuantityClick = () => {
  decreaseProductQuantity(product.id)
 }

 const handleIncreaseProductQuantityClick = () => {
  increaseProductQuantity(product.id)
 }

 const handleRemoveProductItemFromCart = () => {
  removeProductFromCart(product.id)
 }

 return (
  <div className="flex items-center justify-between">

   <div className="flex items-center gap-4">

    <div className="bg-accent flex items-center justify-center rounded-lg w-[90px] h-[77px]">
     <Image
      width={0}
      height={0}
      sizes="100vw"
      alt={product.name}
      src={product.imageUrls[0]}
      style={{ objectFit: 'contain' }}
      className="w-auto h-auto max-w-[80%] max-h-[70%]"
     />
    </div>

    <div className="flex flex-col">
     <p className="text-xs">
      {product.name}
     </p>

     <div className="flex items-center gap-2">

      <p className="text-sm font-bold">
       R$ {product.totalPrice.toFixed(2).replace('.', ',')}
      </p>
      {product.discountPercentage > 0 && (
       <p className="opacity-75 line-through text-xs">
        R$ {Number(product.basePrice).toFixed(2).replace('.', ',')}
       </p>
      )}
     </div>


     <div className="flex items-center gap-1">
      <Button onClick={handleDecreaseProductQuantityClick} size="icon" variant="outline" className="h-8 w-8">
       <ArrowLeftIcon size={16} />
      </Button>

      <span className="text-xs">
       {product.quantity}
      </span>

      <Button onClick={handleIncreaseProductQuantityClick} size="icon" variant="outline" className="h-8 w-8">
       <ArrowRightIcon size={16} />
      </Button>
     </div>

    </div>
   </div>

   <Button onClick={handleRemoveProductItemFromCart} size="icon" variant={"outline"}>
    <TrashIcon size={16} />
   </Button>
  </div>
 );
}

export default CartItem;