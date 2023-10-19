import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/products-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";

interface ProductDetailsProps {
 params: {
  slug: string
 }
}

const ProductDetailsPage = async ({ params: { slug } }: ProductDetailsProps) => {
 const product = await prismaClient.product.findFirst({
  where: {
   slug: slug,
  },
 })

 if (!product) return null;

 return (
  <div className="flex flex-col gap-8">
   <ProductImages
    imageUrls={product.imageUrls}
    name={product.name}
   />
   <ProductInfo product={computeProductTotalPrice(product)} />
  </div>
 );
}

export default ProductDetailsPage;