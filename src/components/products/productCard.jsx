/* eslint-disable react/prop-types */
import { useState } from "react";
import * as MdIcons from "react-icons/md";
import { cart } from "../../assets";
import ExpandedCard from "./expanded card";
import { useNavigate } from "react-router-dom";

function ProductCard({
  data,
  image,
  name,
  type,
  price,
  isMultiple,
  sizes,
  discount,
  popup,
  admin,
  id,
}) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="card bg-white">
      <picture className="bg-shades-200 min-h-[160px] flex flex-col bg-opacity-40">
        <source srcSet={image} media="(min-width: 768px)" />
        <img
          className="w-full h-full flex-1 hover:scale-105 duration-500 cursor-pointer"
          src={image}
          alt={name}
        />
      </picture>

      <div className="flex flex-col justify-between p-4">
        <small className="uppercase mb-1">{admin ? type : data.type}</small>
        <h1 className="card-title text-h1 md:text-[1.2rem] truncate">{name}</h1>

        <div className="flex items-center gap-2 mb-4">
          <h1 className="price text-h1 md:text-[1.2rem]">
            $
            {isMultiple
              ? sizes[0].discount
                ? sizes[0].discount
                : sizes[0].price
              : discount
              ? discount
              : price}
          </h1>
          {isMultiple
            ? sizes[0].discount && (
                <del className="text-xs">${sizes[0].price}</del>
              )
            : discount && <del className="text-xs">${price}</del>}
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
