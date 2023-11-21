/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ExpandedCard from "./expandedCard";
import { ToastContainer } from "react-toastify";

function ProductCard({ data, image, name, price, discount }) {
  const [modal, setModal] = useState(false);

  return (
    <div className="shadow-md rounded-md border-b-2 border-secondary overflow-hidden w-full">
      <div className="bg-shades-200 min-h-[200px] flex flex-col bg-opacity-40">
        <img
          className="w-full h-full flex-1 hover:scale-105 duration-500 cursor-pointer"
          src={image}
          alt={name}
        />
      </div>
      <div className="p-3 space-y-3">
        <h3 className="uppercase text-lg font-semibold">{name}</h3>
        <div className="flex items-center justify-between">
          <p>
            {discount && <del>₦ {price.toLocaleString("en-US")}</del>} ₦{" "}
            {discount
              ? (price - (discount / 100) * price).toLocaleString("en-US")
              : price.toLocaleString("en-US")}
          </p>
          <div
            onClick={() => setModal(true)}
            className="text-white p-2 rounded bg-primary text-sm cursor-pointer"
          >
            <FaPlus />
          </div>
        </div>
      </div>
      <ToastContainer
        enableMultiContainer
        containerId={data.id}
        className="text-xs"
      />
      <div
        className={`${
          !modal
            ? "scale-0 opacity-0 invisible absolute"
            : "opacity-100 scale-100 visible fixed"
        } top-0 left-0 z-30 w-full h-full flex items-center justify-center`}
      >
        <ExpandedCard item={data} {...data} setModal={setModal} />
      </div>
    </div>
  );
}

export default ProductCard;
