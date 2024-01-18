/* eslint-disable react/prop-types */
import { useState } from "react";
import { db } from "../../middleware/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function CartItem({ item, setLoading, setCarts }) {
  const [deleted, setDelete] = useState(false);

  async function deleteCart() {
    setLoading(true);

    try {
      await deleteDoc(doc(db, "carts", item.id));
      setCarts((currentCarts) =>
        currentCarts.filter((cart) => cart.id !== item.id)
      );

      toast.success("Item has been deleted from cart");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error. try again");
      setLoading(false);
    }
  }

  async function updateCart(name, value) {
    setLoading(true);

    try {
      const docRef = doc(db, "carts", item.id);

      if (name !== "color") {
        await updateDoc(docRef, { [name]: value });
        setCarts((currentCarts) =>
          currentCarts.map((cart) =>
            cart.id === item.id ? { ...item, [name]: value } : item
          )
        );
      } else {
        await updateDoc(docRef, {
          delivery: { ...item.delivery, [name]: value },
        });
        setCarts((currentCarts) =>
          currentCarts.map((cart) =>
            cart.id === item.id
              ? {
                  ...item,
                  delivery: { ...item.delivery, [name]: value },
                }
              : item
          )
        );
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="sm:max-w-[200px] max-h-[250px] overflow-hidden">
        <img
          className="w-full object-bottom h-full"
          src={item.images[0]?.url}
          alt={`${item.name} from Moheen Store`}
        />
      </div>
      <div className="w-full">
        <div className="text-black flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold capitalize">{item.name}</h3>

          <p className="text-sm text-neutral">
            ₦{" "}
            {(
              (item.sizes[item.size]?.discount
                ? item.sizes[item.size]?.discount
                : item.sizes[item.size]?.price) * item.quantity
            ).toLocaleString("en-US")}
          </p>
        </div>

        <div className="relative pb-1">
          <h4 className="capitalize">{item.type}</h4>
          <div className="flex items-center gap-1 my-1">
            {item.tags.map((tag, id) => (
              <span
                className="bg-shades-200 bg-opacity-70 px-2 py-1 text-xs rounded text-neutral"
                key={tag.label + id}
              >
                {tag.value}
              </span>
            ))}
          </div>
          <p className="text-sm">{item.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <label htmlFor={`size_${item.id}`}>Size</label>
            <select
              disabled={item.paid}
              id={`size_${item.id}`}
              onChange={(e) => updateCart("size", e.target.value)}
              className="pl-2 py-1 text-center"
              value={item.size}
            >
              {item.sizes.map((option, i) => (
                <option key={option.size} value={i}>
                  {option.size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor={`quantity_${item.id}`}>Quantity</label>
            <select
              disabled={item.paid}
              id={`quantity_${item.id}`}
              onChange={(e) => updateCart("quantity", e.target.value)}
              value={item.quantity}
              className="pl-2 py-1 text-center"
            >
              {new Array(10).fill().map((_, i) => (
                <option key={`${item.id} ${i}`} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap items-center mt-1">
          {item.colors.map((color, id) => (
            <span
              onClick={() => !item.paid && updateCart("color", color.value)}
              style={{ backgroundColor: color.value }}
              className={`${
                item.delivery.color === color.value
                  ? "border-shades-200 w-[1.75rem] h-7 scale-105"
                  : "border-trasparent w-6 h-6"
              } border-2 duration-500 rounded-full ${
                !item.paid ? "cursor-pointer" : ""
              }`}
              key={color.value + id}
            />
          ))}
        </div>

        {!item.paid && (
          <>
            <p
              onClick={() => setDelete(true)}
              className="pt-3 w-fit text-sm underline underline-offset-[6px] cursor-pointer"
            >
              Remove
            </p>
            {deleted && (
              <p className="text-sm pt-3">
                Do you really want to delete?{" "}
                <span
                  className="text-red-500 cursor-pointer underline underline-offset-[6px]"
                  onClick={deleteCart}
                >
                  yes
                </span>{" "}
                /{" "}
                <span
                  className="text-green-500 cursor-pointer underline underline-offset-[6px]"
                  onClick={() => setDelete(false)}
                >
                  no
                </span>
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CartItem;
