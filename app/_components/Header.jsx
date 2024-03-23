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
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../_utils/GlobalApi";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const loggedIn = sessionStorage.getItem("jwt") ? true : false;
  const router = useRouter();
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };
  return (
    <div className="flex justify-between p-5 shadow-md">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={150} height={100} />
        </Link>

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
              <Link href={"/products-category/" + category.attributes.name}>
                <DropdownMenuItem
                  key={uuidv4()}
                  className="flex cursor-pointer items-center gap-3"
                >
                  {Array.isArray(category.attributes?.icon?.data) &&
                  category.attributes.icon.data.length > 0 ? (
                    category.attributes.icon.data.map((imageData, Index) => (
                      <Image
                        key={uuidv4()}
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                          imageData.attributes?.url
                        }
                        unoptimized={true}
                        alt="icon"
                        width={30}
                        height={30}
                      />
                    ))
                  ) : (
                    <div>No image data available</div>
                  )}

                  <h2 className="text-lg">{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
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
        {!loggedIn ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <CircleUserRound className="h-10 w-10 cursor-pointer rounded-full bg-green-50 p-2 text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                My Order
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onSignOut()}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
