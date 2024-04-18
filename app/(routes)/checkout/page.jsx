"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const router = useRouter();
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState(null);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwtFromStorage = sessionStorage.getItem("jwt");
      const userFromStorage = sessionStorage.getItem("user");
      if (jwtFromStorage && userFromStorage) {
        setJwt(jwtFromStorage);
        setUser(JSON.parse(userFromStorage));
      } else {
        router.push("/sign-in");
      }
    }
  }, [router]);

  useEffect(() => {
    if (jwt) {
      getCartItems();
    }
  }, [jwt]);

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
    console.log(cartItemList_);
  };

  useEffect(() => {
    let subtotalAmount = 0;
    cartItemList.forEach((element) => {
      subtotalAmount += element.amount;
    });
    setSubtotal(subtotalAmount.toFixed(2));
    const totalAmount = calculateTotalAmount(subtotalAmount);
    setCartTotalAmount(totalAmount);
  }, [cartItemList]);

  const calculateTotalAmount = (subtotalAmount) => {
    const numericSubtotal = parseFloat(subtotalAmount);
    const tax = totalCartItem * 0.7;
    const delivery = 15;
    const totalAmount = numericSubtotal + tax + delivery;

    return totalAmount.toFixed(2);
  };

  const onApprove = (data) => {
    const payload = {
      data: {
        paymentId: data.paymentId.toString(),
        totalOrderAmount: calculateTotalAmount(subtotal),
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderItemList: cartItemList,
        userId: user.id,
      },
    };
    GlobalApi.createOrder(payload, jwt).then((res) => {
      console.log(res);
      toast("order place successfully");
      cartItemList.forEach((item, index) => {
        GlobalApi.deleteCartItem(item.id).then((res) => {});
      });
    });
    router.replace("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="bg-primary py-4 text-center text-2xl font-bold text-white">
        Checkout
      </h2>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold">Billing Details</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                placeholder="Name"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Input
                placeholder="Zip"
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Input
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-1 rounded-lg bg-white  shadow-md">
            <div className="rounded-t-lg bg-gray-200 p-4">
              <h3 className="text-center text-lg font-bold">
                Total Cart ({totalCartItem})
              </h3>
            </div>
            <div className="space-y-2 px-4 py-4">
              <div className="flex justify-between font-bold">
                <span>Subtotal:</span>
                <span>{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>$15</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%):</span>
                <span>${(totalCartItem * 0.7).toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${cartTotalAmount}</span>
              </div>
            </div>
            <div className="mt-6 space-y-2 px-4 py-4">
              <Button
                className="w-full"
                onClick={() => onApprove({ paymentId: 123 })}
                disabled={!(username && email && address && zip)}
              >
                Payment
              </Button>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: cartTotalAmount,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
