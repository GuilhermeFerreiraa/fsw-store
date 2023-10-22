import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./category-item";

const Categories = async () => {

 const categories = await prismaClient.category.findMany({})

 return (
  <div className="grid grid-cols-2 md:grid-cols-6 gap-y-[10px] gap-x-4 md:max-w-[90%] md:mx-auto">
   {categories.map((category) => <CategoryItem key={category.id} category={category} />)}
  </div>
 );
}

export default Categories;