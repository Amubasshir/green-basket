import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  console.log(cartItemList);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubtotal(total.toFixed(2));
  }, [cartItemList]);
  return (
    <div>
      <div className="h-[560px] overflow-auto">
        {cartItemList.map((cart, index) => (
          <div
            key={index}
            className="mb-5 flex items-center justify-between p-2"
          >
            <div className="flex items-center gap-6">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart.Image}`}
                width={70}
                height={70}
                alt={cart.name}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2 className="">Quantity:&nbsp;{cart.quantity}</h2>
                <h2 className="text-lg font-bold">${cart.amount}</h2>
              </div>
            </div>
            <Trash2Icon
              onClick={() => onDeleteItem(cart.id)}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 flex w-[90%] flex-col">
        <h2 className="flex justify-between px-2 text-lg font-bold">
          Subtotal <span>${subtotal}</span>
        </h2>
        <Button>View Cart</Button>
      </div>
    </div>
  );
};

export default CartItemList;
