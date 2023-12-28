/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { cart } from "../../../assets";
import { deliveryTax } from "../../../assets/data";

function ProductForm({ clip, next, checkout, setCheckout }) {
  const [error, setError] = useState(false);
  const user =
    JSON.parse(sessionStorage.getItem("moheen-shop-checkout-details")) || null;

  useEffect(() => {
    if (user !== null) {
      const form = Object.keys(user);
      form.map((i) => {
        setCheckout((prev) => ({
          ...prev,
          [i]: user[i],
        }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    if (
      checkout.firstName !== "" &&
      checkout.lastName !== "" &&
      checkout.email !== "" &&
      checkout.delivery_location !== ""
    ) {
      setError(false);
      next();
    } else {
      setError(true);
    }
  };

  return (
    <div
      className={`${
        clip ? "visible relative py-16 !pb-8" : "invisible absolute"
      } sm:relative sm:opacity-100 sm:visible pr-8 pl-6 sm:py-8 space-y-3`}
    >
      <form className="flex flex-col gap-3 text-sm">
        <div className="flex gap-2 w-full">
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="checkout_shipping_address_first_name"
              className="field_label"
            >
              First name
            </label>
            <input
              className="border border-primary px-3 py-2 rounded w-full"
              required="required"
              size="30"
              type="text"
              name="first_name"
              id="checkout_shipping_address_first_name"
              value={checkout.firstName}
              onChange={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              onInput={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              placeholder="First name"
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="checkout_shipping_address_last_name"
              className="field__label"
            >
              Last name
            </label>
            <input
              className="border border-primary px-3 py-2 rounded w-full"
              required="required"
              size="30"
              type="text"
              name="last_name"
              id="checkout_shipping_address_last_name"
              value={checkout.lastName}
              onChange={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              onInput={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="checkout_shipping_mail" className="field__label">
            Email
          </label>
          <input
            className="border border-primary px-3 py-2 rounded w-full"
            required="required"
            size="30"
            type="email"
            name="mail"
            id="checkout_shipping_mail"
            autoComplete="email"
            value={checkout.email}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            onInput={(e) =>
              setCheckout((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="Email"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="checkout_shipping_address_province1"
            className="field__label"
          >
            Delivery Station (if within Lagos)
          </label>
          <select
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                delivery_location: e.target.value,
              }))
            }
            required="required"
            size="1"
            name="state1"
            id="checkout_shipping_address_province1"
            className="border border-primary px-3 py-2 rounded w-full"
            disabled={
              checkout.delivery_location === ""
                ? false
                : !deliveryTax
                    .slice(0, 52)
                    .some((item) => item.state === checkout.delivery_location)
            }
          >
            <option value="">--- Please Select ---</option>
            {deliveryTax
              .slice(0, 52)
              .sort((a, b) => a.state.localeCompare(b.state))
              .map(({ state }) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="checkout_shipping_address_province"
            className="field__label"
          >
            Delivery Station (Other States)
          </label>
          <select
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                delivery_location: e.target.value,
              }))
            }
            disabled={
              checkout.delivery_location === ""
                ? false
                : !deliveryTax
                    .slice(52)
                    .some((item) => item.state === checkout.delivery_location)
            }
            required="required"
            size="1"
            name="state"
            id="checkout_shipping_address_province"
            className="border border-primary px-3 py-2 rounded w-full"
          >
            <option value="">--- Please Select ---</option>
            {deliveryTax
              .slice(52)
              .sort((a, b) => a.state.localeCompare(b.state))
              .map(({ state }) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="checkout_shipping_address_address1"
            className="field__label"
          >
            Additional Address
          </label>
          <input
            className="border border-primary px-3 py-2 rounded w-full"
            required="required"
            size="30"
            type="text"
            name="street"
            id="checkout_shipping_address_address1"
            autoComplete="address"
            value={checkout.address}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            onInput={(e) =>
              setCheckout((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            placeholder="Additonal Address"
          />
        </div>
      </form>
      {error && (
        <p className="text-red-500 text-sm"> Please fill out all information</p>
      )}
      <button onClick={handleSubmit} className="card-btn ml-auto">
        <img src={cart} alt="cart" /> Next
      </button>
    </div>
  );
}

export default ProductForm;
