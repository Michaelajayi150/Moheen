/* eslint-disable react/prop-types */
import { useState } from "react";
import * as MdIcons from "react-icons/md";
import { cart } from "../../assets";
import ExpandedCard from "./expanded card";
import { useNavigate } from "react-router-dom";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

function ProductCard({ data, images, name, type, sizes, popup, admin, id }) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="card bg-white relative">
      <Swiper
        // install Swiper modules
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 2000 * Math.random() + 1500,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        className="h-full w-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="relative">
            <picture className="bg-shades-200 h-full flex flex-col bg-opacity-40">
              <source srcSet={image.url} media="(min-width: 768px)" />
              <img
                className="w-full max-h-[450px] sm:max-h-[300px] md:max-h-[250px] flex-1"
                src={image.url}
                alt={name}
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col justify-between p-4">
        <small className="uppercase mb-1">{admin ? type : data.type}</small>
        <h1 className="card-title text-h1 md:text-[1.2rem] truncate">{name}</h1>

        <div className="flex items-center gap-2 mb-4">
          <h1 className="price text-h1 md:text-[1.2rem]">
            ₦
            {(sizes[0].discount
              ? sizes[0].discount
              : sizes[0].price
            ).toLocaleString("en-US")}
          </h1>
          {sizes[0].discount !== 0 && (
            <del className="text-xs">
              ₦ {sizes[0].price.toLocaleString("en-US")}
            </del>
          )}
        </div>
        {!popup && !admin ? (
          <button onClick={() => setModal(true)} className="card-btn">
            <img src={cart} alt="cart" /> Add to Cart
          </button>
        ) : (
          <button
            onClick={() => navigate(`/admin/uploadProduct/${type}/${id}`)}
            className="card-btn !gap-[4px]"
          >
            <MdIcons.MdEditNote size="1.8rem" /> Edit / Modify
          </button>
        )}
      </div>

      {!popup && (
        <div
          className={`${
            !modal
              ? "scale-0 opacity-0 invisible absolute"
              : "opacity-100 scale-100 visible fixed"
          } top-0 left-0 z-30 w-full h-full flex items-center justify-center duration-500`}
        >
          {modal && <ExpandedCard item={data} setModal={setModal} />}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
