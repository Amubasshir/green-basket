import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";

const Checkout = () => {
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
              <Input placeholder="Name" />
              <Input placeholder="Email" />
              <Input placeholder="Phone" />
              <Input placeholder="Zip" />
            </div>
            <div className="mt-4">
              <Input placeholder="Address" />
            </div>
          </div>
          <div className="col-span-1 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-bold">Total Cart (3)</h3>
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span>Subtotal:</span>
                <span>$25</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>$25</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%):</span>
                <span>$25</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>$25</span>
              </div>
            </div>
            <div className="mt-6">
              <Button className="hover:bg-primary-dark w-full justify-center bg-primary text-white">
                Payment <ArrowBigRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
