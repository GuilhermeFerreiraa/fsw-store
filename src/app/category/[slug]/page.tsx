import ProductItem from "@/app/(home)/components/product-item";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

const CategoryProducts = async ({ params }: any) => {

 const category = await prismaClient.category.findFirst({
  where: {
   slug: params.slug
  }
  , include: {
   products: true,
  }
 })

 const products = await prismaClient.product.findMany({
  where: {
   category: {
    slug: params.slug,
   }
  }
 })

 if (!category) {
  return null;
 }

 return (
  <div className="flex flex-col gap-8 p-5">
   <Badge variant="outline" className="w-fit gap-1 border-primary px-3 py-[0.375rem] border-2 text-base uppercase">
    {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
    {category.name}
   </Badge>

   <div className="grid grid-cols-2 gap-8">
    {products.map(product => <ProductItem key={product.id} product={computeProductTotalPrice(product)} />)}
   </div>
  </div>
 );
}

export default CategoryProducts;