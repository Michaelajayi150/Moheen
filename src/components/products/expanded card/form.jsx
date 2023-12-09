/* eslint-disable react/prop-types */
import { cart } from "../../../assets";
import CitySelector from "../../citySelector";

function ProductForm({ clip, next, checkout, setCheckout }) {
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
            htmlFor="checkout_shipping_address_address1"
            className="field__label"
          >
            Address
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
            placeholder="Address"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="checkout_shipping_address_city"
            className="field__label"
          >
            City
          </label>
          <input
            className="border border-primary px-3 py-2 rounded w-full"
            required="required"
            placeholder="City"
            autoComplete="shipping address-level2"
            size="30"
            type="text"
            name="city"
            id="checkout_shipping_address_city"
            value={checkout.city}
            onChange={(e) =>
              setCheckout((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            onInput={(e) =>
              setCheckout((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex gap-2 w-full">
          <CitySelector state={checkout} setCheckout={setCheckout} />
        </div>
      </form>
      <button onClick={next} className="card-btn ml-auto">
        <img src={cart} alt="cart" /> Next
      </button>
    </div>
  );
}

export default ProductForm;
