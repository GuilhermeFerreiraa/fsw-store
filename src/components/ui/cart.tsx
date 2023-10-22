import { ShapesIcon, ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from '@stripe/stripe-js'


const Cart = () => {

 const { products, total, subTotal, totalDiscount } = useContext(CartContext);

 const handleFinishPurchaseClick = async () => {
  const checkout = await createCheckout(products);

  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

  stripe?.redirectToCheckout({
   sessionId: checkout.id,
  })
 }

 return (
  <div className="flex flex-col h-full gap-8">
   <Badge variant="outline" className="w-fit gap-1 border-primary px-3 py-[0.375rem] border-2 text-base uppercase">
    <ShoppingCartIcon size={16} />
    Carrinho
   </Badge>

   {products.length > 0 ? (
    <>
     <div className="flex flex-col gap-5 overflow-hidden h-full max-h-full">
      <ScrollArea className="h-full">
       <div className="flex h-full flex-col gap-8">
        {products.map(product => <CartItem product={computeProductTotalPrice(product as any) as any} key={product.id} />)}
       </div>
      </ScrollArea>
     </div>

     <ul className="flex flex-col gap-3">
      <Separator />
      <li className="grid grid-cols-2">
       <p className="text-md">
        Subtotal
       </p>
       <p className="text-sm text-right">
        R$ {subTotal.toFixed(2).replace('.', ',')}
       </p>
      </li>
      <Separator />
      <li className="grid grid-cols-2">
       <p className="text-md">
        Entrega
       </p>
       <p className="text-sm text-right uppercase">
        Grátis
       </p>
      </li>
      <Separator />
      <li className="grid grid-cols-2">
       <p className="text-md">
        Descontos
       </p>
       <p className="text-sm text-right">
        - R$ {(totalDiscount).toFixed(2).replace('.', ',')}
       </p>
      </li>
      <Separator />
      <li className="grid grid-cols-2">
       <p className="text-md font-bold">
        Total
       </p>
       <p className="text-lg font-bold text-right">
        R$ {(total).toFixed(2).replace('.', ',')}
       </p>
      </li>
     </ul>

     <Button onClick={handleFinishPurchaseClick} className="font-bold mt-7 uppercase">Finalizar Compra</Button>
    </>
   ) : (
    <p className="text-center text-sm">
     Nenhum produto foi encontrado no carrinho, visite nossa loja e aproveite as ofertas!
    </p>
   )
   }
  </div>
 );
}

export default Cart;