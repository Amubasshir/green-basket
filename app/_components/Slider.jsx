import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = ({ sliderList }) => {
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider, index) => (
          <CarouselItem key={index}>
            {Array.isArray(slider.attributes?.image?.data) &&
            slider.attributes.image.data.length > 0 ? (
              slider.attributes.image.data.map((imageData, imageIndex) => (
                <Image
                  key={imageIndex}
                  src={
                    process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                    imageData.attributes.url
                  }
                  width={1000}
                  height={400}
                  alt={imageData.attributes.name}
                  className=" h-[200px] w-full rounded-2xl object-fill md:h-[300px] lg:h-[400px]"
                />
              ))
            ) : (
              <div>No image data available</div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;
