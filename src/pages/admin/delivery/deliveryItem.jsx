/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function DeliveryItem({ id, cart }) {
  return id === "fullname" ? (
    cart?.delivery?.firstName + " " + cart?.delivery?.lastName
  ) : id === "status" ? (
    <span
      className={`${
        cart[id] === "pending"
          ? "bg-red-600 text-red-600"
          : cart[id] === "on-going"
          ? "bg-primary text-primary"
          : "bg-green-600 text-green-700"
      } bg-opacity-20 w-fit py-2 text-xs px-4 gap-1 rounded-full`}
    >
      {cart[id]}
    </span>
  ) : id === "price" ? (
    <>₦ {cart?.amountPaid && cart?.amountPaid.toLocaleString("en-US")}</>
  ) : id === "email" ? (
    <span className="normal-case py-1">{cart?.delivery?.email}</span>
  ) : id === "ellipsis" ? (
    <Link
      to={`/admin/deliveries/view?deliveryId=${encodeURIComponent(cart.id)}`}
      className="bg-opacity-20 w-fit py-2 border cursor-pointer text-xs px-4 rounded"
    >
      View
    </Link>
  ) : (
    cart[id]
  );
}

export default DeliveryItem;
