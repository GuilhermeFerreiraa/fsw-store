import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/section-title";
import PromoBanner from "./components/promo-banner";

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
      <div className="p-5">
        <PromoBanner
          src="/banner_home-01.png"
          alt="Até 55% de desconto esse mês!"
        />

        <div className="mt-8">
          <Categories />
        </div>

      </div>

      <div>
        <SectionTitle>
          Ofertas
        </SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner_home-02.png"
        alt="Até 55% de desconto em mouses!"
      />


      <div>
        <SectionTitle>
          Teclados
        </SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src="/banner_home-03.png"
        alt="Até 55% de desconto em mouses!"
      />


      <div>
        <SectionTitle>
          Mouses
        </SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  )
}
