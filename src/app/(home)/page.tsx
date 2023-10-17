'use client'

import { useSession } from "next-auth/react"
import Image from "next/image";
import Categories from "./components/categories";

export default function Home() {
  const { data } = useSession();

  return (
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
  )
}
