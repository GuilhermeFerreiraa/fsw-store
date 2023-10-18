import { Badge } from "@/components/ui/badge";
import { ProductsWithTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { ArrowDown01Icon, ArrowDownIcon } from "lucide-react";
import Image from "next/image";

interface ProductItemProps {
 product: ProductsWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
 return (
  <div className="flex flex-col gap-4 max-w-[156px]">

   <div className="relative bg-accent rounded-lg w-[156px] h-[170px] flex items-center justify-center">
    <Image
     width={0}
     height={0}
     sizes="100vw"
     alt={product.name}
     src={product.imageUrls[0]}
     className="h-auto w-auto max-w-[70%]"
     style={{ objectFit: 'contain' }}
    />

    {product.discountPercentage && (
     <Badge className="absolute left-3 top-3 px-2 py-[2px]">
      <ArrowDownIcon size={14} />
      {product.discountPercentage}%
     </Badge>
    )}
   </div>

   <div className="flex flex-col gap-1">
    <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
     {product.name}
    </p>

    <div className="flex items-center gap-2">
     {product.discountPercentage > 0 ? (
      <>
       <p className="font-semibold">
        R$ {Number(product.totalPrice).toFixed(2).replace('.', ',')}
       </p>

       <p className="opacity-75 line-through text-xs">
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
 );
}


export default ProductItem;