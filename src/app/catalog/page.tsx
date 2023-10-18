import { Badge } from "@/components/ui/badge";
import { MenuIcon, ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";
import { prismaClient } from "@/lib/prisma";

const CatalogPage = async () => {

 const categories = await prismaClient.category.findMany({

 })

 return (
  <div className="p-5 flex flex-col gap-8">
   <Badge variant="outline" className="w-fit gap-1 border-primary px-3 py-[0.375rem] border-2 text-base uppercase">
    <ShapesIcon size={16} />
    Catálogo
   </Badge>

   <div className="grid grid-cols-2 gap-8">
    {categories.map(category => <CategoryItem key={category.id} category={category} />)}
   </div>
  </div>
 );
}

export default CatalogPage;