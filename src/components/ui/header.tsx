'use client'

import { MenuIcon, ShoppingCart, LogIn, PercentIcon, ListOrderedIcon, HomeIcon, LogOut } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";

const Header = () => {

 const { status, data } = useSession()

 const handleLoginClick = async () => {
  await signIn();
 }

 const handleLogOutClick = async () => {
  await signOut();
 }

 return (
  <Card className="flex p-[1rem] justify-between items-center">
   <Sheet>

    <SheetTrigger asChild>
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

   <Link href="/">
    <h1 className="font-semibold text-lg">
     <span className="text-primary">FSW</span> Store
    </h1>
   </Link>

   <Sheet>
    <SheetTrigger asChild>
     <Button variant="outline" size="icon">
      <ShoppingCart />
     </Button>
    </SheetTrigger>

    <SheetContent className="w-[360px]">
     <Cart />
    </SheetContent>
   </Sheet>
  </Card>
 );
}

export default Header;