import { Category } from '@prisma/client'
import Image from 'next/image';

interface CategoryItemProps {
 category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
 return (
  <div className="flex flex-col mt-4">
   <div className="w-full h-[150px] rounded-tl-lg rounded-tr-lg bg-category-item-gradient flex items-center justify-center">
    <Image
     src={category.imageUrl}
     alt={category.name}
     width={0}
     height={0}
     sizes="100vw"
     className="h-auto max-h-[70%] w-auto max-w-[80%]"
     style={{ objectFit: 'contain' }}
    />
   </div>

   <div className="bg-accent rounded-br-lg rounded-bl-lg py-3">
    <p className="font-semibold text-sm text-center">
     {category.name}
    </p>
   </div>
  </div>
 );
}

export default CategoryItem;