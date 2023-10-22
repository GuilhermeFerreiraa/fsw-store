'use client'

import { MenuIcon, ShoppingCart, LogIn, PercentIcon, ListOrderedIcon, HomeIcon, LogOut, User2 } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

const Header = () => {

 const { status, data } = useSession()

 const { products } = useContext(CartContext);

 const handleLoginClick = async () => {
  await signIn();
 }

 const handleLogOutClick = async () => {
  await signOut();
 }

 return (
  <Card className="flex p-[1rem] justify-between items-center md:px-[3rem] md:mx-auto md:w-full md:min-h-[90px]">

   <div className="hidden md:block">
    <Link href="/">
     <h1 className="font-semibold text-lg">
      <span className="text-transparent mr-1 bg-clip-text bg-gradient-to-r from-accent-foreground to-primary">
       FSW
      </span>
      Store
     </h1>
    </Link>
   </div>

   <Sheet>

    <SheetTrigger asChild className="sm:block md:hidden">
     <Button variant="outline" size="icon">
      <MenuIcon />
     </Button>
    </SheetTrigger>

    <SheetContent side="left">

     <SheetHeader className="text-left text-lg font-semibold">
      Menu
     </SheetHeader>

     {status === "authenticated" && data?.user && (

      <div className="flex flex-col">
       <div className="flex gap-2 items-center py-4">
        <Avatar>
         <AvatarFallback>
          {data.user?.name?.[0].toUpperCase()}
         </AvatarFallback>

         {data.user.image && <AvatarImage src={data.user.image} />}
        </Avatar>

        <div className="flex flex-col">
         <p className="font-medium">
          {data.user.name}
         </p>
         <p className="text-sm opacity-75">
          Boas compras!
         </p>
        </div>
       </div>

       <Separator />
      </div>
     )}


     <div className="flex gap-3 flex-col mt-4">

      {status == "unauthenticated" && (

       <Button variant="outline" className="gap-2 w-full justify-start" onClick={handleLoginClick}>
        <LogIn size={16} />
        Fazer Login
       </Button>

      )}

      {status == "authenticated" && (
       <Button variant="outline" className="gap-2 w-full justify-start" onClick={handleLogOutClick}>
        <LogOut size={16} />
        Fazer Logout
       </Button>
      )}

      <SheetClose asChild>
       <Link href="/">
        <Button variant="outline" className="gap-2 w-full justify-start">
         <HomeIcon size={16} />
         Início
        </Button>
       </Link>
      </SheetClose>


      <SheetClose asChild>
       <Link href="/deals">
        <Button variant="outline" className="gap-2 w-full justify-start">
         <PercentIcon size={16} />
         Ofertas
        </Button>
       </Link>
      </SheetClose>

      <SheetClose asChild>
       <Link href='/catalog'>
        <Button variant="outline" className="gap-2 w-full justify-start">
         <ListOrderedIcon size={16} />
         Catálogo
        </Button>
       </Link>
      </SheetClose>
     </div>

    </SheetContent>
   </Sheet>

   <Link href="/" className="sm:block md:hidden">
    <h1 className="font-semibold text-lg">
     <span className="text-primary">FSW</span> Store
    </h1>
   </Link>

   <div className="hidden md:flex items-center justify-center gap-8">
    <Link href="/">
     <p className="font-bold text-base hover:text-primary hover:opacity-90 transition-all ease-in">
      Início
     </p>
    </Link>
    <Separator
     orientation="vertical"
     className="bg-gray-400 w-[1px] border-0 h-4"
    />
    <Link href="/catalog">
     <p className="font-bold text-base hover:text-primary hover:opacity-90 transition-all ease-in">
      Catálogo
     </p>
    </Link>
    <Separator
     orientation="vertical"
     className="bg-gray-400 w-[1px] border-0 h-4"
    />
    <Link href="/deals">
     <p className="font-bold text-base hover:text-primary hover:opacity-90 transition-all ease-in">
      Ofertas
     </p>
    </Link>
   </div>

   <Sheet>
    <div className="md:flex items-center justify-center md:gap-8">

     <div className="hidden md:block">
      <Button variant="outline" size="icon" onClick={handleLoginClick}>
       <User2 size={16} />
      </Button>
     </div>

     <SheetTrigger asChild>
      <div className="relative flex">
       <Button variant="outline" size="icon">
        <ShoppingCart />
       </Button>

       {products.length > 0 && (
        <Badge className="absolute top-[-5px] right-[-5px] p-0 w-6 h-6 items-center justify-center">
         <span className="text-xs font-semibold">
          {products.length}
         </span>
        </Badge>
       )}
      </div>
     </SheetTrigger>
    </div>

    <SheetContent className="w-[360px]">
     <Cart />
    </SheetContent>
   </Sheet>
  </Card>
 );
}

export default Header;