import { ShapesIcon, ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";

const Cart = () => {

 const { products, total, subTotal, totalDiscount } = useContext(CartContext);

 return (
  <div className="flex flex-col gap-8">
   <Badge variant="outline" className="w-fit gap-1 border-primary px-3 py-[0.375rem] border-2 text-base uppercase">
    <ShoppingCartIcon size={16} />
    Carrinho
   </Badge>

   {products.length > 0 ? (
    <>
     <div className="flex flex-col gap-5">
      {products.map(product => <CartItem product={computeProductTotalPrice(product as any) as any} key={product.id} />)}
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