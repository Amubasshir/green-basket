import ProductItem from "./ProductItem";

const ProductList = ({ productList }) => {
  return (
    <div>
      <h2 className=" text-xl font-bold text-green-600">
        Our popular products
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {productList.map((product, index) => (
          <ProductItem product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
