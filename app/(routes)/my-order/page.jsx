"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MyOrderItem from "./_components/MyOrderItem";

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
      <div className="mx-2 my-8 px-2 md:mx-7 md:px-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div className="">
          {orderList.map((item, index) => (
            <Collapsible key={index}>
              {/* <CollapsibleTrigger>
                <div className="lg:-w-[1200px] xl:-w-[1400px] grid grid-cols-3 border bg-slate-100 p-2 px-5 sm:w-[400px] md:w-[800px]">
                  <h2 className="col-span-1">
                    <span className="mr-2 font-bold">Order Date:</span>
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </h2>
                  <h2 className="col-span-1">
                    <span className="mr-2 font-bold">Total Amount:</span>
                    {item.totalOrderAmount}
                  </h2>
                  <h2 className="col-span-1">
                    <span className="mr-2 font-bold">Status:</span>
                    Pending
                  </h2>
                </div>
              </CollapsibleTrigger> */}
              <CollapsibleTrigger>
                <div className="border bg-slate-100 sm:w-[16rem] md:w-[46rem] md:p-4 lg:w-[58rem] xl:w-[75rem]">
                  <div className="grid grid-cols-3 gap-4">
                    <h2 className="font-bold">
                      <span className="mr-2">Order Date:</span>
                      {moment(item.createdAt).format("DD/MM/YYYY")}
                    </h2>
                    <h2 className="font-bold">
                      <span className="mr-2">Total Amount:</span>
                      {item.totalOrderAmount}
                    </h2>
                    <h2 className="font-bold">
                      <span className="mr-2">Current Status:</span>
                      Pending
                    </h2>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order, index_) => (
                  <MyOrderItem
                    orderItem={order}
                    index_={index_}
                    key={index_}
                    totalItems={item.orderItemList.length}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
