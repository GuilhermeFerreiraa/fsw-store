import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    }
  })

  return (
    <>
      <div className="p-5">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
          src="/banner_home-01.png"
          alt="Até 55% de desconto esse mês!" />

        <div className="mt-8">
          <Categories />
        </div>

      </div>
      <div className="mt-8">
        <ProductList products={deals} />
      </div>
    </>
  )
}
