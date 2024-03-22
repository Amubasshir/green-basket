"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProductItemDetails = ({ product }) => {
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp,
  );
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="grid grid-cols-1 bg-white p-7 text-[#333] md:grid-cols-2">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes.images.data[0].attributes.url
        }
        alt="image"
        width={300}
        height={300}
        className="h-[320px] w-[300px] rounded-lg bg-slate-100 object-contain p-5"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-[#333]">
          {product.attributes?.name}
        </h2>
        <h2 className="text-sm text-gray-500">
          {product.attributes?.description}
        </h2>
        <div className="flex items-center gap-2">
          {product.attributes.sellingPrice && (
            <h2 className="text-3xl font-bold text-[#333]">
              ${product.attributes?.sellingPrice}
            </h2>
          )}
          <h2
            className={`text-3xl font-bold text-[#333] ${product.attributes.sellingPrice && "text-gray-600 line-through decoration-red-400"}`}
          >
            ${product.attributes?.mrp}
          </h2>
        </div>
        <h2 className="text-lg font-medium text-[#333]">
          Quantity:({product.attributes?.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-10 border p-2 px-5">
              <button
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-2xl font-bold">
              =&nbsp;${(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button>
            <ShoppingBasket />
            Add To Cart
          </Button>
        </div>
        <h2>
          <span className="font-bold text-[#333]">Category:</span>
          &nbsp;
          {product.attributes?.categories?.data[0]?.attributes?.name}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetails;
