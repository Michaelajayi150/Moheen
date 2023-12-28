/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { MdArrowBack, MdOutlinePayment } from "react-icons/md";
import { usePaystackPayment } from "react-paystack";
import { collection, getDocs, query, setDoc, where } from "firebase/firestore";

import { cart } from "../../../assets";
import { AuthContext } from "../../../App";
import { db } from "../../../middleware/firebase";
import Preloader from "../../preloader";
import { deliveryTax } from "../../../assets/data";

function Checkout({
  type,
  discount,
  price,
  id,
  setModal,
  sizes,
  clip,
  checkout,
  setCheckout,
  back,
}) {
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [saveDetails, setSaveDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, setOption, setCart } = useContext(AuthContext);

  async function addToCart(paid) {
    setLoading(true);
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let data = doc.data();
      data.cart = [
        ...data.cart,
        {
          id: id,
          type: type,
          quantity,
          paid,
          size,
          status: "pending",
          deliveryDate: "",
          delivery: { ...checkout },
          cid: data.cart.length + 1,
        },
      ];

      setDoc(
        doc.ref,
        { cart: data.cart, details: saveDetails ? checkout : null },
        { merge: true }
      )
        .then(() => {
          setDisabled(false);
          setLoading(false);

          if (saveDetails) {
            toast.success("Cart has been added and details saved");
          } else {
            toast.success("Cart has been added");
          }
          setCart(data.cart);
          setModal(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error. try again");
          setDisabled(false);
          setLoading(false);
        });
    });
  }

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    const paid = true;
    addToCart(paid);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    setDisabled(false);
    console.log("closed");
  };

  const paymentKey = import.meta.env.VITE_CLIENT_PAYSTACK_API_KEY;

  const initializePayment = usePaystackPayment({
    publicKey: paymentKey,
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount:
      ((size === null
        ? discount
          ? discount * quantity
          : price * quantity
        : sizes[size].discount
        ? sizes[size].discount * quantity
        : sizes[size]?.price * quantity) +
        deliveryTax.filter(
          (item) => item.state === checkout.delivery_location
        )[0].fee) *
      100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: "NGN",
  });

  const handleSubmit = (event) => {
    if (!user) {
      setOption("login");
    } else {
      setDisabled(true);
      let paid = false;

      if (event === "pay") {
        console.log("Load payment platform");
        initializePayment(onSuccess, onClose);
      } else {
        console.log("Add to cart");
        addToCart(paid);
      }
    }
  };

  return (
    <div
      className={`${
        clip ? "visible relative py-16 !pb-8" : "invisible absolute"
      } sm:relative sm:opacity-100 sm:visible pr-8 pl-6 sm:py-8 space-y-3`}
    >
      <Preloader modal={loading} />
      <div
        onClick={back}
        className="bg-primary px-4 py-2 border rounded-full border-white text-white w-fit cursor-pointer text-xs hover:text-primary hover:border-primary hover:bg-white flex justify-center items-center gap-1 duration-500"
      >
        <MdArrowBack />
        Details
      </div>
      <div className="space-y-3">
        <div className="flex-1 w-full flex flex-col gap-2">
          <label
            htmlFor="checkout_shipping_address_phone"
            className="field__label"
          >
            Phone
          </label>
          <input
            className="border border-primary px-3 py-2 rounded w-full"
            required="required"
            type="tel"
            name="phone"
            id="checkout_shipping_address_phone"
            autoComplete="phone"
            value={checkout.phone}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            onInput={(e) =>
              setCheckout((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            placeholder={user?.details?.phone ? user.details.phone : "Phone"}
          />
        </div>
        <div className="flex items-start gap-1">
          <input
            type="checkbox"
            name="checkout_term_use"
            id="checkout_form_use"
            onClick={() => setSaveDetails((prev) => !prev)}
          />
          <label htmlFor="checkout_form_use" className="-translate-y-1.5">
            Note if checked, this number will be reached out to for all other
            orders on this account
          </label>
        </div>

        <div className="flex items-center gap-2">
          {sizes && (
            <div className="flex items-center gap-2">
              <label htmlFor={`size_${id}`}>Size</label>
              <select
                id={`size_${id}`}
                onChange={(e) => setSize(e.target.value)}
                className="pl-2 py-1 text-center"
              >
                {sizes.map((option, i) => (
                  <option key={option.size} value={i}>
                    {option.size}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label htmlFor={`quantity_${id}`}>Quantity</label>
            <select
              id={`quantity_${id}`}
              onChange={(e) => setQuantity(e.target.value)}
              className="pl-2 py-1 text-center"
            >
              {new Array(10).fill().map((_, i) => (
                <option key={`${id} ${i}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between w-full items-center">
            <p>Subtotal</p>
            {size === null ? (
              <p>
                ₦{" "}
                {discount
                  ? (discount * quantity).toLocaleString("en-US")
                  : (price * quantity).toLocaleString("en-US")}{" "}
                {discount && (
                  <del>₦ {(price * quantity).toLocaleString("en-US")}</del>
                )}
              </p>
            ) : (
              <p>
                ₦{" "}
                {sizes[size]?.discount
                  ? (sizes[size]?.discount * quantity).toLocaleString("en-US")
                  : (sizes[size]?.price * quantity).toLocaleString(
                      "en-US"
                    )}{" "}
                {sizes[size]?.discount && (
                  <del>
                    ₦ {(sizes[size]?.price * quantity).toLocaleString("en-US")}
                  </del>
                )}
              </p>
            )}
          </div>
          <div className="flex justify-between w-full items-center">
            <p>Estimated delivery fee</p>
            <p>
              {deliveryTax.filter(
                (item) => item.state === checkout.delivery_location
              )[0].fee === 0
                ? "-"
                : `₦ ${deliveryTax
                    .filter(
                      (item) => item.state === checkout.delivery_location
                    )[0]
                    .fee.toLocaleString("en-US")}`}
            </p>
          </div>

          <div className="flex justify-between w-full items-center border-y border-neutral py-2">
            <p>Total</p>
            {size === null ? (
              <p>
                ₦{" "}
                {(discount
                  ? discount * quantity +
                    deliveryTax.filter(
                      (item) => item.state === checkout.delivery_location
                    )[0].fee
                  : price * quantity +
                    deliveryTax.filter(
                      (item) => item.state === checkout.delivery_location
                    )[0].fee
                ).toLocaleString("en-US")}
              </p>
            ) : (
              <p>
                ₦
                {(sizes[size]?.discount
                  ? sizes[size]?.discount * quantity +
                    deliveryTax.filter(
                      (item) => item.state === checkout.delivery_location
                    )[0].fee
                  : sizes[size]?.price * quantity +
                    deliveryTax.filter(
                      (item) => item.state === checkout.delivery_location
                    )[0].fee
                ).toLocaleString("en-US")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex max-sm:flex-wrap gap-3 justify-center uppercase text-white">
        <button
          disabled={disabled}
          onClick={() => handleSubmit("add")}
          className={`card-btn !px-8 ${
            disabled && "!bg-[#3d8067] !bg-opacity-50"
          } max-sm:w-full`}
        >
          <img src={cart} alt="cart" /> Add to Cart
        </button>
        <button
          disabled={disabled}
          onClick={() => handleSubmit("pay")}
          className={`bg-primary max-sm:w-full border border-white px-8 py-4 rounded-xl flex justify-center items-center gap-2 ${
            disabled
              ? "hover:border-white bg-opacity-50"
              : "hover:bg-white hover:border-primary hover:text-primary"
          }`}
        >
          <MdOutlinePayment />
          Pay now
        </button>
      </div>
    </div>
  );
}

export default Checkout;
