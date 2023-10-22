import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/section-title";
import PromoBanner from "./components/promo-banner";
import Link from "next/link";

export default async function Home() {

  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      }
    }
  })

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards"
      }
    }
  })

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses"
      }
    }
  })

  return (
    <div className="flex flex-col gap-y-8">
      <div className="hidden md:block">
        <Link href="/deals" target="_blank">
          <PromoBanner
            src="/banner-desktop_home-01.png"
            alt="Até 55% de desconto esse mês!"
          />
        </Link>
      </div>
      <div className="p-5">
        <div className="sm:block md:hidden">
          <PromoBanner
            src="/banner_home-01.png"
            alt="Até 55% de desconto esse mês!"
          />
        </div>

        <div className="mt-8">
          <Categories />
        </div>

      </div>

      <div className="md:max-w-[90%] md:mx-auto">
        <SectionTitle>
          Ofertas
        </SectionTitle>
        <ProductList products={deals} />
      </div>

      <div className="hidden md:flex items-center justify-between md:w-full md:gap-12 md:max-w-[90%] md:mx-auto">

        <PromoBanner
          src="/banner-desktop_home-03.png"
          alt="Até 55% de desconto em mouses!"
        />
        <PromoBanner
          src="/banner-desktop_home-02.png"
          alt="Até 55% de desconto em mouses!"
        />
      </div>

      <div className="sm:block md:hidden">
        <PromoBanner
          src="/banner_home-02.png"
          alt="Até 55% de desconto em mouses!"
        />
      </div>

      <div className="md:max-w-[90%] md:w-full md:mx-auto">
        <SectionTitle>
          Teclados
        </SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <div className="sm:block md:hidden">
        <PromoBanner
          src="/banner_home-03.png"
          alt="Até 55% de desconto em mouses!"
        />
      </div>

      <div className="hidden md:block">
        <PromoBanner
          src="/banner-desktop_home-04.png"
          alt="Frete Grátis para todo Brasil"
        />
      </div>

      <div className="md:max-w-[90%] md:w-full md:mx-auto">
        <SectionTitle>
          Mouses
        </SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}
