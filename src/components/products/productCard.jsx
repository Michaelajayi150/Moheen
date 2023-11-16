/* eslint-disable react/prop-types */
import { FaPlus } from "react-icons/fa6";

function ProductCard({ image, title, amount }) {
  return (
    <div className="shadow-md rounded-md overflow-hidden w-full">
      <img
        className="w-full hover:scale-105 duration-500 cursor-pointer"
        src={image}
        alt={title}
      />
      <div className="p-3 space-y-3">
        <h3 className="uppercase text-lg font-semibold">{title}</h3>
        <div className="flex items-center justify-between">
          <p>₦ {amount}</p>
          <div className="text-white p-2 rounded bg-primary text-sm cursor-pointer">
            <FaPlus />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
