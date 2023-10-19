import DiscountBadge from "@/components/ui/discount-badge";
import { ProductsWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
 product: ProductsWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
 return (
  <Link href={`/product/${product.slug}`}>
   <div className="flex flex-col gap-4">

    <div className="relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center">
     <Image
      width={0}
      height={0}
      sizes="100vw"
      alt={product.name}
      src={product.imageUrls[0]}
      className="h-auto max-h-[70%] w-auto max-w-[80%]"
      style={{ objectFit: 'contain' }}
     />

     {product.discountPercentage && (
      <DiscountBadge className="absolute left-3 top-3">
       {product.discountPercentage}
      </DiscountBadge>
     )}
    </div>

    <div className="flex flex-col gap-1">
     <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
      {product.name}
     </p>

     <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
      {product.discountPercentage > 0 ? (
       <>
        <p className="font-semibold">
         R$ {Number(product.totalPrice).toFixed(2).replace('.', ',')}
        </p>

        <p className="opacity-75 line-through text-xs overflow-hidden whitespace-nowrap text-ellipsis">
         R$ {Number(product.basePrice).toFixed(2).replace('.', ',')}
        </p>
       </>
      ) : (
       <p className="text-sm font-semibold">
        R$ {Number(product.basePrice).toFixed(2).replace('.', ',')}
       </p>
      )}
     </div>
    </div>
   </div>
  </Link>
 );
}


export default ProductItem;