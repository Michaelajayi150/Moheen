/* eslint-disable react/prop-types */
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

function ProductDescription({
  type,
  images,
  name,
  description,
  tags,
  clip,
  sizes,
  colors,
  chosenColor,
  selectColor,
}) {
  return (
    <div
      className={`${
        !clip ? "visible relative" : "invisible absolute"
      } sm:relative sm:opacity-100 sm:visible sm:w-[250px] bg-white flex flex-col`}
    >
      <Swiper
        // install Swiper modules
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        className="h-full w-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="relative">
            <picture className="bg-shades-200 max-h-[450px] sm:max-h-[300px] md:max-h-[250px] flex flex-col bg-opacity-40">
              <source srcSet={image.url} media="(min-width: 768px)" />
              <img
                className="w-full h-full flex-1"
                src={image.url}
                alt={name}
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col justify-between p-4 h-full">
        <small className="uppercase mb-1">{type}</small>
        <div className="space-y-1">
          <h1 className="card-title text-[1.2rem] truncate">{name}</h1>
          <p className="product-description text-xs">{description}</p>
          {tags && (
            <div className="flex gap-2 text-sm">
              Tags:
              <ul className="flex gap-2 flex-wrap">
                {tags?.map((tag) => (
                  <li key={tag.label}>{tag.value}</li>
                ))}
              </ul>
            </div>
          )}
          {colors && (
            <div className="flex gap-2 text-sm items-center">
              Colors:
              <ul className="flex gap-2 flex-wrap items-center">
                {colors.map((color) => (
                  <li
                    key={color.label}
                    onClick={() => selectColor(color.value)}
                    style={{ backgroundColor: color.value }}
                    className={`${
                      chosenColor === color.value
                        ? "border-shades-200 w-7 h-7 scale-105"
                        : "border-trasparent w-6 h-6"
                    } border-2 duration-500 rounded-full`}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4 mt-auto">
          <h1 className="md:text-[.9rem]">Unit Price: </h1>
          <h1 className="price text-[1.2rem]">
            ₦
            {(sizes[0].discount
              ? sizes[0].discount
              : sizes[0].price
            ).toLocaleString("en-US")}
          </h1>
          {sizes[0].discount !== 0 && (
            <del className="text-xs">
              ₦{sizes[0].price.toLocaleString("en-US")}
            </del>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
