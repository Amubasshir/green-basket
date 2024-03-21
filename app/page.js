import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <div className="p-5 px-14 md:p-10 md:px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
      <Image
        src="/banner.png"
        width={1000}
        height={300}
        alt="banner"
        className="h-[400px] w-full rounded-lg object-contain"
      />
      <Footer />
    </div>
  );
}
