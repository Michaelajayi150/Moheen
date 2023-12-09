/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import ProductDescription from "./description";
import ProductForm from "./form";
import { useState } from "react";
import * as IoIcon from "react-icons/io";
import Checkout from "./checkout";

function ExpandedCard({ setModal, item }) {
  const [clip, setClip] = useState(true);
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({
    address: "",
    city: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    state: "",
    zip: "",
    fee: 0,
  });

  return (
    <>
      <div
        onClick={() => setModal(false)}
        className="absolute bg-neutral opacity-70 w-full h-full cursor-pointer"
      />
      <div className="relative z-10 border-b-4 border-secondary w-[90%] max-sm:max-w-[400px] sm:w-11/12 lg:max-w-[700px] min-w-[280px] sm:min-w-[300px] mx-auto bg-white flex max-sm:flex-col">
        <div className="absolute top-2 px-2 z-10 flex items-center justify-between w-full gap-3">
          <div
            onClick={() => setClip((prev) => !prev)}
            className="cursor-pointer rounded-full sm:hidden bg-opacity-50 bg-primary flex flex-row justify-between items-center px-4 py-2 gap-3 text-white text-sm w-max"
          >
            <h3 className="capitalize">{item.name}</h3>
            {clip ? <IoIcon.IoMdEye /> : <IoIcon.IoMdEyeOff />}
          </div>

          <div
            onClick={() => setModal(false)}
            className="w-6 h-6 cursor-pointer rounded-full flex items-center justify-center bg-shades-200 bg-opacity-50 ml-auto"
          >
            <MdClose />
          </div>
        </div>

        <ProductDescription {...item} clip={clip} />
        {!checkout ? (
          <ProductForm
            clip={clip}
            next={() => setCheckout((prev) => !prev)}
            checkout={form}
            setCheckout={setForm}
          />
        ) : (
          <Checkout
            back={() => setCheckout((prev) => !prev)}
            clip={clip}
            {...item}
            checkout={form}
            setCheckout={setForm}
          />
        )}
      </div>
    </>
  );
}

export default ExpandedCard;
