import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg  border p-2 transition-all ease-in-out hover:scale-105 hover:shadow-md md:p-6">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes?.images?.data[0]?.attributes?.url
        }
        width={500}
        height={500}
        alt={product.attributes.name}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="text-balance text-center text-lg font-bold text-[#333]">
        {product.attributes.name}
      </h2>
      <div className="flex items-center gap-2">
        {product.attributes.sellingPrice && (
          <h2 className="font-bold text-[#333]">
            ${product.attributes.sellingPrice}
          </h2>
        )}
        <h2
          className={`font-bold text-[#333] ${product.attributes.sellingPrice && "text-gray-600 line-through decoration-red-400"}`}
        >
          ${product.attributes.mrp}
        </h2>
      </div>
      <Button
        variant="outline"
        className="text-primary transition-colors hover:bg-primary hover:text-white"
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductItem;
