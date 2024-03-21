import CategoryList from "./_components/CategoryList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div className="p-5 px-14 md:p-10 md:px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
    </div>
  );
}
