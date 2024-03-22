import Image from "next/image";
import Link from "next/link";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <div className="mx-8 mt-3 flex justify-center gap-5 overflow-auto md:mx-20">
      {categoryList.map((category, index) => (
        <Link
          href={"/products-category/" + category.attributes.name}
          key={index}
          className={`group flex w-[150px] min-w-[100px] cursor-pointer flex-col items-center gap-2 rounded-lg bg-green-50 p-3 hover:bg-green-600 ${selectedCategory === category.attributes.name && "bg-green-600 text-white"} `}
        >
          {Array.isArray(category.attributes?.icon?.data) &&
          category.attributes.icon.data.length > 0 ? (
            category.attributes.icon.data.map((imageData, imageIndex) => (
              <Image
                key={imageIndex}
                src={
                  process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                  imageData.attributes?.url
                }
                unoptimized={true}
                alt="icon"
                width={30}
                height={30}
                className="transition-all ease-out group-hover:scale-125"
              />
            ))
          ) : (
            <div>No image data available</div>
          )}
          <h2
            className={`text-center font-serif font-medium text-green-900 ${selectedCategory === category.attributes.name && " text-white"}`}
          >
            {category.attributes.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;
