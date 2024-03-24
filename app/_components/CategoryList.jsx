import Image from "next/image";
import Link from "next/link";

const CategoryList = ({ categoryList }) => {
  return (
    <div className="mt-5">
      <h2 className=" text-xl font-bold text-green-600">Shop By Category</h2>
      <div className="my-4 grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {categoryList.map((category, index) => (
          <Link
            href={"/products-category/" + category.attributes.name}
            key={index}
            className="group flex cursor-pointer flex-col items-center gap-2 rounded-lg bg-green-50 p-3 hover:bg-green-200"
          >
            {Array.isArray(category.attributes?.image?.data) &&
            category.attributes.image.data.length > 0 ? (
              category.attributes.image.data.map((imageData, imageIndex) => (
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
            <h2 className="text-center font-serif font-medium text-green-900">
              {category.attributes.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
