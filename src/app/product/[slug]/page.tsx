import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/products-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/section-title";
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
  include: {
   category: {
    include: {
     products: {
      where: {
       slug: {
        not: slug,
       }
      }
     },
    }
   }
  }
 })

 if (!product) return null;

 return (
  <div className="flex flex-col gap-8">
   <ProductImages
    imageUrls={product.imageUrls}
    name={product.name}
   />

   <ProductInfo product={computeProductTotalPrice(product)} />

   <div>
    <SectionTitle>
     Produtos recomendados
    </SectionTitle>
    <ProductList products={product.category.products} />
   </div>
  </div>
 );
}

export default ProductDetailsPage;