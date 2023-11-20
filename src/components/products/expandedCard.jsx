/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../App";

function ExpandedCard({
  image,
  name,
  price,
  tags,
  description,
  discount,
  setModal,
}) {
  const [quantity, setQuantity] = useState(1);
  const { user, setOption } = useContext(AuthContext);

  const handleSubmit = (event) => {
    if (!user) {
      setOption("login");
    } else {
      console.log(event);
    }
  };

  return (
    <>
      <div
        onClick={() => setModal(false)}
        className="absolute bg-neutral opacity-70 w-full h-full cursor-pointer"
      />
      <div className="relative z-10 rounded-md border-b-2 border-secondary overflow-hidden w-10/12 sm:w-11/12 md:w-10/12 md:max-w-[700px] min-w-[300px] mx-auto bg-white flex max-sm:flex-col gap-2">
        <div className="bg-shades-200 sm:min-h-[200px] w-full flex flex-col bg-opacity-40">
          <img className="w-full h-full" src={image} alt={name} />
        </div>
        <div className="px-6 md:px-3 py-6 space-y-3 w-full">
          <div className="flex gap-3 items-center">
            {tags.map((tag, id) => (
              <div className="bg-shades-100 px-2 pb-1" key={tag + id}>
                {tag}
              </div>
            ))}
          </div>

          <div>
            <h3 className="uppercase text-lg font-semibold">{name}</h3>
            <div className="product-description relative pb-3">
              <h4>Description</h4>
              <p>{description}</p>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="text-sm">
              <label htmlFor="quantity">Quantity</label>
              <form className="mt-2 relative max-w-[60px] w-full flex items-center text-sm">
                <span
                  onClick={() =>
                    setQuantity((prev) => (prev < 0 ? 0 : prev - 1))
                  }
                  className="absolute left-1 text-2xl mb-1 cursor-pointer font-semibold"
                >
                  -
                </span>
                <input
                  className="border-2 text-center py-1 px-2 border-neutral outline-none rounded w-full h-full"
                  type="text"
                  name="calculator"
                  id="quantity"
                  placeholder="1"
                  value={quantity}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setQuantity(value < 0 ? 1 : value);
                  }}
                />
                <span
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="absolute right-1 text-xl mb-1 cursor-pointer font-semibold"
                >
                  +
                </span>
              </form>
            </div>

            <p>
              {discount && (
                <del>₦ {(price * quantity).toLocaleString("en-US")}</del>
              )}{" "}
              ₦{" "}
              {discount
                ? (
                    price * quantity -
                    (discount / 100) * (price * quantity)
                  ).toLocaleString("en-US")
                : (price * quantity).toLocaleString("en-US")}
            </p>
          </div>

          <div className="flex max-sm:flex-wrap-reverse gap-3 uppercase text-white">
            <div
              onClick={() => handleSubmit("add")}
              className="bg-secondary max-sm:w-fit border sm:mt-3 border-white hover:bg-white hover:border-secondary hover:text-secondary cursor-pointer px-6 pt-2 pb-3 rounded"
            >
              Add to cart
            </div>
            <div
              onClick={() => handleSubmit("pay")}
              className="bg-primary max-sm:w-fit border sm:mt-3 border-white hover:bg-white hover:border-primary hover:text-primary  cursor-pointer px-6 pt-2 pb-3 rounded"
            >
              Pay now
            </div>
          </div>
        </div>
        <div
          onClick={() => setModal(false)}
          className="absolute top-2 right-2 w-6 h-6 cursor-pointer rounded-full flex items-center justify-center bg-shades-200 bg-opacity-50"
        >
          <MdClose />
        </div>
      </div>
    </>
  );
}

export default ExpandedCard;
