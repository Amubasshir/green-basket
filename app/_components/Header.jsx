import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between p-5 shadow-md">
      <div className="flex items-center gap-8">
        <Image src="/logo.png" alt="logo" width={150} height={100} />
        <h2 className="hidden items-center gap-2 rounded-full border bg-slate-200 p-2 px-10 sm:flex">
          <LayoutGrid className="h-5 w-5" /> Category
        </h2>
        <div className="hidden items-center gap-3 rounded-full border p-2 px-5 md:flex">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <h2 className="flex items-center gap-2 text-lg">
          <ShoppingBag />0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Header;
