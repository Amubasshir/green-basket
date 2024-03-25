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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import GlobalApi from "../_utils/GlobalApi";
import CartItemList from "./CartItemList";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const loggedIn = sessionStorage.getItem("jwt") ? true : false;
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);
  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
    console.log(cartItemList_);
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((res) => {
      toast("Item removed!!!");
      getCartItems();
    });
  };

  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubtotal(total.toFixed(2));
  }, [cartItemList]);

  return (
    <div className="flex justify-between gap-3 p-5 shadow-md">
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
                  {Array.isArray(category.attributes?.image?.data) &&
                  category.attributes.image.data.length > 0 ? (
                    category.attributes.image.data.map(
                      (imageData, imageIndex) => (
                        <Image
                          key={imageIndex}
                          src={
                            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                            imageData.attributes?.url
                          }
                          unoptimized={true}
                          alt="icon"
                          width={30}
                          height={30}
                          className="transition-all ease-out group-hover:scale-125"
                        />
                      ),
                    )
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
        <Sheet>
          <SheetTrigger>
            <h2 className="flex items-center gap-2 text-lg">
              <ShoppingBag />
              <span className="rounded-full bg-primary px-2 text-white">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mt-4 bg-primary p-2 text-lg font-bold text-white">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute bottom-6 flex w-[90%] flex-col">
                <h2 className="flex justify-between px-2 text-lg font-bold">
                  Subtotal <span>${subtotal}</span>
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

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
              <Link href={"/my-order"}>
                <DropdownMenuItem className="cursor-pointer">
                  My Order
                </DropdownMenuItem>
              </Link>
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
