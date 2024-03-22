import ProductList from "@/app/_components/ProductList";
import GlobalApi from "@/app/_utils/GlobalApi";
import TopCategoryList from "../_components/TopCategoryList";

const ProductCategory = async ({ params }) => {
  const productList = await GlobalApi.getProductsByCategory(
    params.categoryName,
  );
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className="bg-primary p-4 text-center text-3xl font-bold text-white">
        {params.categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default ProductCategory;
