import { MenuIcon, ShoppingCart, LogIn, PercentIcon, ListOrderedIcon, HomeIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

const Header = () => {
 return (
  <Card className="flex p-[1.875rem] justify-between">
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

     <div className="flex gap-3 flex-col mt-2">
      <Button variant="outline" className="gap-2 w-full justify-start">
       <LogIn size={16} />
       Fazer Login
      </Button>

      <Button variant="outline" className="gap-2 w-full justify-start">
       <HomeIcon size={16} />
       Início
      </Button>

      <Button variant="outline" className="gap-2 w-full justify-start">
       <PercentIcon size={16} />
       Ofertas
      </Button>

      <Button variant="outline" className="gap-2 w-full justify-start">
       <ListOrderedIcon size={16} />
       Catálogo
      </Button>
     </div>

    </SheetContent>
   </Sheet>

   <h1 className="font-semibold text-lg">
    <span className="text-primary">FSW</span> Store
   </h1>

   <Button variant="outline" size="icon">
    <ShoppingCart />
   </Button>
  </Card>
 );
}

export default Header;