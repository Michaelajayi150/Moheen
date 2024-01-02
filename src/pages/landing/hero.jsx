import { Link } from "react-router-dom";
import {
  backgroundImage,
  backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
  backgroundImage5,
} from "../../assets";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

function HeroSection() {
  const images = [
    backgroundImage,
    backgroundImage1,
    backgroundImage2,
    backgroundImage3,
    backgroundImage4,
    backgroundImage5,
  ];

  return (
    <section className="relative">
      <div className="absolute left-0 top-0 -z-10 w-full h-full">
        <Swiper
          // install Swiper modules
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          className="h-full"
        >
          {images.map((image) => (
            <SwiperSlide key={image}>
              <img
                className="h-full w-full bg-contain"
                src={image}
                alt="Welcome to Moheen"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] py-16 px-6 max-w-[1120px] mx-auto flex flex-col gap-4 items-center justify-center text-white text-center">
        <h3 className="text-lg md:text-2xl">ENJOY YOUR SHOPPING WITH US!</h3>
        <h1 className="text-2xl md:text-4xl">SHOPPING AT MOHEEN COLLECTIONS</h1>
        <Link
          to="/products?type="
          className="uppercase bg-primary hover:bg-white hover:text-primary font-semibold cursor-pointer px-6 pt-2 pb-3 rounded"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
