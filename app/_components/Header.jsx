"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      console.log(res.data.data);
      setCategoryList(res.data.data);
    });
  };
  return (
    <div className="flex justify-between p-5 shadow-md">
      <div className="flex items-center gap-8">
        <Image src="/logo.png" alt="logo" width={150} height={100} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden cursor-pointer items-center gap-2 rounded-full border bg-slate-200 p-2 px-10 sm:flex">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="hidden flex-col px-2 sm:flex">
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {categoryList.map((category, index) => (
              <DropdownMenuItem
                key={index}
                className="flex cursor-pointer items-center gap-3"
              >
                {Array.isArray(category?.attributes?.icon?.data) &&
                  category?.attributes?.icon?.data.length > 0 && (
                    <Image
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                        category?.attributes?.icon?.data[0]?.attributes?.url
                      }
                      unoptimized={true}
                      alt="icon"
                      width={30}
                      height={30}
                    />
                  )}

                <h2 className="text-lg">{category?.attributes?.name}</h2>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
