'use client'

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
 imageUrls: string[]
 name: string
}

const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {

 const [currentImage, setCurrentImage] = useState(imageUrls[0]);

 const handleImageClick = (imageUrl: string) => {
  setCurrentImage(imageUrl)
 }

 return (
  <div className="flex flex-col">
   <div className="flex bg-accent h-[380px] w-full items-center justify-center rounded-b-2xl">
    <Image
     className="h-auto max-h-[70%] w-auto max-w-[80%]"
     src={currentImage}
     sizes="100vw"
     alt={name}
     height={0}
     width={0}
     style={{ objectFit: 'contain' }}
    />
   </div>

   <div className="grid grid-cols-4 gap-4 px-5">
    {imageUrls.map((imageUrl) => (
     <button onClick={() => handleImageClick(imageUrl)} className={`${imageUrl === currentImage && 'border-2 border-primary border-solid'} bg-accent rounded-lg flex justify-center items-center h-[100px] mt-8`} key={imageUrl}>
      <Image
       src={imageUrl}
       alt={name}
       height={0}
       width={0}
       sizes="100vw"
       className="h-auto max-h-[70%] w-auto max-w-[80%]"
      />
     </button>
    ))}
   </div>
  </div>
 );
}

export default ProductImages;