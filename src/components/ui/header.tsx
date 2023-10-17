import { MenuIcon, ShoppingCart  } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

const Header = () => {
 return (
  <Card className="flex p-[1.875rem] justify-between">
   <Button variant="outline" size="icon">
    <MenuIcon />
   </Button>

   <h1 className="font-semibold text-lg">
    <span className="text-primary">
     FSW
    </span> 
    Store
   </h1>

   <Button variant="outline" size="icon">
    <ShoppingCart />
   </Button>
  </Card>
 );
}

export default Header;