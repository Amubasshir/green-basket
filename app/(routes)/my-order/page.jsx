"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyOrder = () => {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [orderList, setOrderList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!jwt) {
      router.replace("/");
    }
    getMyOrder();
  }, []);
  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(user.id, jwt);
    setOrderList(orderList_);
    console.log("my-orderrrrrrrrrrrrr", orderList_);
  };

  return (
    <div>
      <h2 className="bg-primary py-4 text-center text-2xl font-bold text-white">
        My order
      </h2>
      <div className="mx-7 py-8 md:px-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div>
          {orderList.map((order, index) => (
            <Collapsible>
              <CollapsibleTrigger>
                <div>
                  <h2>Order Date:{item.createdAt}</h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                Yes. Free to use for personal and commercial projects. No
                attribution required.
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
